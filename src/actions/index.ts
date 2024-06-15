import { db } from "@/lib/db";
import { Prisma } from "@prisma/client";

export async function saveJSON_WORDS(words: any, userId: any) {
  const listOfWords = words as Prisma.WordsGetPayload<{}>[];
  listOfWords.forEach(async (word) => {
    const data = await db.words.findFirst({
      where: {
        userId: userId,
        OR: [
          {
            russian :{
              contains: word.russian
            }
          },
          {
            german :{
              contains: word.german
            }
          }

        ] 
          
      },
    });
    if (!data) {
      await db.words.create({
        data: {
          ...word,
          userId,
        },
      });
    }
  });
}