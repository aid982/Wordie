import { saveJSON_WORDS } from "@/actions";
import { NextResponse } from "next/server";


export async function POST(req: Request) {
  try {
    const userId = req.headers.get('userId');    
    const category = req.headers.get('category');    
    console.log(category)

    const body = await req.json();    
    const  words  = body;    
    await saveJSON_WORDS( words,userId,category);    

    return new NextResponse("Words updated in database successfully", {
      status: 200,
    });
  } catch (error) {
    console.error("Error updating database:", error);
    return new NextResponse("Error updating user in database", { status: 500 });
  }
}
