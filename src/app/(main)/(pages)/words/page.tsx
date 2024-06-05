import { auth } from "@/auth";
import Navbar from "@/components/global/Navbar";
import WordCard from "@/components/words-components/word-card";
import { db } from "@/lib/db";
import { EditWordSchema } from "@/types";
import { z } from "zod";

export default async function Home() {
  const session = await auth();
  const user = session?.user;  
  if(!user) return;
  const cursor =0;
  const words = await db.words.findMany({    
    skip:1,
    where: {
      userId: user?.id,
    },
    orderBy: {
      rating: {
        sort: "asc",
        nulls:"first"
      },
    },
  });   

  const saveCard = async (id:number,userRating:number,qtyShown:number|null)=>{
    'use server'    
    var qty = 1;
    if(qtyShown) qty = qtyShown+1;
    await db.words.update({
      where:{
        id
      },
      data:{
        qtyShown:qty,
        userRating,
        rating:userRating*qty
      }
    })
  }
  
  const onUpdateCard = async (word:z.infer<typeof EditWordSchema>,id:number,newCard:boolean)=>{
    'use server'       
    console.log(id,word,newCard)     
    if(newCard) {
      if(user.id) await db.words.create({       
        data:{
          ...word,          
          userId:user?.id
        }
      })
    } else   
    await db.words.update({
      where:{
        id
      },
      data:{
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
