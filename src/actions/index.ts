'use server'
import { db } from "@/lib/db";
import { Prisma } from "@prisma/client";
export async function saveJSON_WORDS(words: any, userId: any, category: string | null) {
  const listOfWords = words as Prisma.WordsGetPayload<{}>[];

  let curCategory = null;
  if (category) {
    curCategory = await db.category.findFirst({
      where: {
        name: category,
        userId
      }
    })
    if (!curCategory) {
      curCategory = await db.category.create({
        data: {
          name: category,
          userId
        }
      })
    }
  }

  for (let index = 0; index < listOfWords.length; index++) {
    const word = listOfWords[index];
    const data = await db.words.findFirst({
      where: {
        userId: userId,
        AND: [
          {
            russian: {
              contains: word.russian
            }
          },
          {
            german: {
              contains: word.german
            }
          }

        ]

      },
      include: {
        categories: {
          select: {
            categoryId: true
          }
        },

      }
    });


    if (!data) {
      // We don't find the word
      if (curCategory) {
        await db.words.create({
          data: {
            ...word,
            userId,
            categories: {
              create: {
                categoryId: curCategory.id
              }
            }
          },
          include: {
            categories: true
          }

        });

      } else {

        await db.words.create({
          data: {
            ...word,
            userId

          },
          include: {
            categories: true
          }

        });
      }
    } else {
      console.log('Word has been already in  data base ', data.german)
      if (curCategory) {
        console.log('Adding category to word', data.german)

        // Delete all categories and save data
        await db.words.update({
          where: {
            id: data.id
          },
          data: {
            ...word,
            userId,
            categories: {
              deleteMany: {
              }
            }
          },
          include: {
            categories: true
          }

        });
        await db.words.update({
          where: {
            id: data.id
          },
          data: {
            ...word,
            userId,
            categories: {
              createMany: {
                data: [...data.categories.map(val => ({ categoryId: val.categoryId })),{categoryId:curCategory.id} ]
              }
            }
          },
          include: {
            categories: true
          }

        });
      }
    }

  }
}