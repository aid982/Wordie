import { db } from "@/lib/db";
import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";

async function saveJSON_WORDS(words: any, userId: any) {  
  const listOfWords = words as Prisma.WordsGetPayload<{}>[];
  listOfWords.forEach(async (word) => {
    console.log('Getting data from data base')
    try {

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
    } catch (error) {
      console.error(error)
    }
  });
}


export async function POST(req: Request) {
  try {
    const userId = req.headers.get('userId');    
    const body = await req.json();    
    const  words  = body;
    console.log('Current words ',words)
    await saveJSON_WORDS( words,userId);    

    return new NextResponse("Words updated in database successfully", {
      status: 200,
    });
  } catch (error) {
    console.error("Error updating database:", error);
    return new NextResponse("Error updating user in database", { status: 500 });
  }
}
