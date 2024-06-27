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
      userId: user?.id,
    },
    orderBy: {
      rating: {
        sort: "asc",
        nulls: "first"
      },
    },
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
        if (!dataFind) await db.words.create({
          data: {
            ...word,
            userId: user?.id
          }
        })
        console.log('We already have this word ', word)

      }
    } else
      await db.words.update({
        where: {
          id
        },
        data: {
          ...word
        }
      })
  }


  const onAddCategory = async (values: z.infer<typeof EditCategorySchema>) => {
    'use server'
    console.log('Adding')

    if (user.id) {
      const dataFind = await db.category.findFirst({
        where: {
          name: values.name
        }
      })

      if (dataFind) {
        console.log('We already have this category ', values.name)
        await db.category.update({
          where: {
            id: dataFind.id
          },
          data: {
            ...values
          }
        })
      } else {
        console.log('Adding category')
        await db.category.create({
          data: {
            ...values,
            userId: user?.id
          }
        })
      }
    }
  }



  return (
    <div>
      <Navbar />
      <WordCard words={words} saveCard={saveCard} onUpdate={onUpdateCard} onAddCategory={onAddCategory} />
    </div>
  );
}
