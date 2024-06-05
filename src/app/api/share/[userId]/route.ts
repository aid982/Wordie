import { saveJSON_WORDS } from "@/app/actions";
import { NextResponse } from "next/server";



export async function GET(req: Request, { params }: { params: { userId: string } }) {
  const userId = params.userId
  console.log(userId)
  return new NextResponse("Words updated in database successfully", {
    status: 200,
  });
  
}
