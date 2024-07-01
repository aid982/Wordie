'use server'
import { MAX_NUMBER_OF_WORDS } from "@/lib/constant";
import { db } from "@/lib/db";
import { EditCategorySchema, EditWordSchema } from "@/types";
import { User } from "next-auth";
import { z } from "zod";


export const saveCard_onNext = async ({ id, userRating, prevRating, qtyShown }: { id: number, userRating: number, prevRating: number | null, qtyShown: number | null, user: User }) => {
  var qty = 1;
  if (qtyShown) qty = qtyShown + 1;
  console.log(userRating, prevRating)

  return await db.words.update({
    where: {
      id
    },
    data: {
      qtyShown: qty,
      userRating,
      rating: prevRating ? prevRating + userRating : userRating
    }
  })
}

export const saveCard_onUpdateCreate = async ({ id, newCard, user, word }: { word: z.infer<typeof EditWordSchema>, id: number, newCard: boolean, user: User }) => {
  'use server'
  console.log(id, word, newCard)
  if (newCard) {

    if (user.id) {
      const dataFind = await db.words.findFirst({
        where: {
          russian: word.russian
        }
      })
      if (!dataFind) {
        let { categories_tmp, categories, ...curWord } = word
        if (categories_tmp) {
          await db.words.create({
            data: {
              ...curWord,
              userId: user?.id,
              categories: {
                createMany: {
                  data: categories_tmp.map(e => ({ categoryId: +e }))
                }

              },

            },
            include: {
              categories: true
            }
          })

        } else
          await db.words.create({
            data: {
              ...curWord,
              userId: user?.id,
            }
          })

      }
      console.log('We already have this word ', word)


    }
  } else {

    let { categories_tmp, categories, ...curWord } = word

    await db.words.update({
      where: {
        id
      },
      data: {
        ...curWord,
        categories: {
          deleteMany: {

          }

        }
      },
      include: {
        categories: true

      }
    })
    if (categories_tmp) {

      await db.words.update({
        where: {
          id
        },
        data: {
          categories: {
            createMany: {
              data: categories_tmp.map(e => ({ categoryId: +e }))
            }

          }
        },
        include: {
          categories: true

        }
      })
    }
  }
}


export const saveCategory = async ({ user, values }: { values: z.infer<typeof EditCategorySchema>, user: User }) => {
  if (user.id) {
    if (values.id) {
      console.log('We already have this category ', values.name)
      await db.category.update({
        where: {
          id: values.id
        },
        data: {
          ...values
        }
      })
    } else {
      console.log('Adding category')
      const { id: _, name } = values
      await db.category.create({
        data: {
          name,
          userId: user?.id
        }
      })
    }
  }
}


export const getWords = async ({ user, categoriesIds }: { user: User, categoriesIds: string[] }) => {
  let categories = undefined;
  if (categoriesIds.length != 0) {
    categories = {
      some: {
        categoryId: {
          in: categoriesIds.map(val => +val)
        }
      }
    }
  }

  const words = await db.words.findMany({
    where: {
      userId: user?.id,
      categories
    },
    take:MAX_NUMBER_OF_WORDS,    
    orderBy: {
      rating: {
        sort: "asc",
        nulls: "first"
      },
    },
    include: {
      categories: {
        select: {
          category: {
            select: {
              name: true,
              id: true
            }
          }
        }
      }
    }

  });
  return words;
}

export const getCategories = async (user: User) => {
  const categories = await db.category.findMany({
    where: {
      userId: user?.id,
    }
  });

  return categories;

}


export const getQtyOfCards = async ({ user, categoriesIds }: { user: User, categoriesIds: string[] }) => {
  let categories = undefined;
  if (categoriesIds.length != 0) {
    categories = {
      some: {
        categoryId: {
          in: categoriesIds.map(val => +val)
        }
      }
    }
  }

  const words = await db.words.aggregate({
    where: {
      userId: user?.id,
      categories
    },
    _count:{
      id:true
    }
  });
  return words;
}
