'use server'
import { db } from "@/lib/db";
import { Prisma } from "@prisma/client";
export async function saveJSON_WORDS(words: any, userId: any) {
  const listOfWords = words as Prisma.WordsGetPayload<{}>[];
  for (let index = 0; index < listOfWords.length; index++) {
    const word = listOfWords[index];
    const data = await db.words.findFirst({
      where: {
        userId: userId,
        OR: [
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
    });

    console.log('Word has been already in  data base ', data)
    if (!data) {
      await db.words.create({
        data: {
          ...word,
          userId,
        },
      });
    }

  }
}