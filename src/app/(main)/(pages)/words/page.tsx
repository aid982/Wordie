import { auth } from "@/auth";
import Navbar from "@/components/global/Navbar";
import WordCard from "@/components/words-components/word-card";
import { db } from "@/lib/db";
import { EditWordSchema } from "@/types";
import { z } from "zod";

export default async function Home() {
  const session = await auth();
  const user = session?.user;
  if (!user) return;
  const cursor = 0;
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
          where:{
            russian:word.russian
          }
        })
        if(!dataFind) await db.words.create({
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

  return (
    <div>
      <Navbar />
      <WordCard words={words} saveCard={saveCard} onUpdate={onUpdateCard} />
    </div>
  );
}
