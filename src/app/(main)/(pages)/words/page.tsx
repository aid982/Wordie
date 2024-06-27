import { auth } from "@/auth";
import Navbar from "@/components/global/Navbar";
import WordCard from "@/components/words-components/word-card";
import { db } from "@/lib/db";
import { EditCategorySchema, EditWordSchema } from "@/types";
import { z } from "zod";

export default async function Home() {
  const session = await auth();
  const user = session?.user;
  if (!user) return;
  const words = await db.words.findMany({
    where: {
      userId: user?.id      
    },    
    orderBy: {
      rating: {
        sort: "asc",
        nulls: "first"
      },
    },
    include:{
      categories:{
        select:{          
          category:{
            select:{
              name:true,
              id:true
            }
          }
        }
      }
    } 

  });

  const categories = await db.category.findMany({
    where: {
      userId: user?.id,
    }
  });


  const saveCard = async (id: number, userRating: number, prevRating: number | null, qtyShown: number | null) => {
    'use server'
    var qty = 1;
    if (qtyShown) qty = qtyShown + 1;
    console.log(userRating, prevRating)

    await db.words.update({
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

  const onUpdateCard = async (word: z.infer<typeof EditWordSchema>, id: number, newCard: boolean) => {
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
          if(categories_tmp) {
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
              include:{
                categories:true
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
        console.log(categories_tmp)

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


  const onAddCategory = async (values: z.infer<typeof EditCategorySchema>) => {
    'use server'
    console.log('Adding',values)

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
        const {id:_,name} = values
        await db.category.create({
          data: {
            name,
            userId: user?.id
          }
        })
      }
    }
  }



  return (
    <div>
      <Navbar />
      <WordCard categories={categories} words={words} saveCard={saveCard} onUpdate={onUpdateCard} onAddCategory={onAddCategory} />

    </div>
  );
}
