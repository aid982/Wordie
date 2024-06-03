import { db } from "@/lib/db";
import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";

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

export async function POST(req: Request) {
  try {
    const userId = req.headers.get('userId');
    console.log(userId)
    const body = await req.json();
    console.log(body);
    const  words  = body;
    await saveJSON_WORDS( words,userId);
    

    return new NextResponse("User updated in database successfully", {
      status: 200,
    });
  } catch (error) {
    console.error("Error updating database:", error);
    return new NextResponse("Error updating user in database", { status: 500 });
  }
}
