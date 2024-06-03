import { db } from "@/lib/db";
import { Prisma } from "@prisma/client";

export async function saveJSON_WORDS(words: any, userId: any) {
    const listOfWords = words as Prisma.WordsGetPayload<{}>[];
    console.log(listOfWords)
    listOfWords.forEach(async (word) => {
      const data = await db.words.findFirst({
        where: {
          userId: userId,
          russian: {
            contains: word.russian,
          },
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