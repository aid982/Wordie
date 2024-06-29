import { auth } from "@/auth";
import Navbar from "@/components/global/Navbar";
import { db } from "@/lib/db";
import WordCard from "./word-card";

export default async function Home() {
  const session = await auth();
  const user = session?.user;
  if (!user) return; 

  return (
    <div>
      <Navbar />
      <WordCard user={user}/>
    </div>
  );
}
