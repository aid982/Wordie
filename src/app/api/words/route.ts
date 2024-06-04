import { saveJSON_WORDS } from "@/app/actions";
import { NextResponse } from "next/server";



export async function POST(req: Request) {
  try {
    const userId = req.headers.get('userId');    
    const body = await req.json();    
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
