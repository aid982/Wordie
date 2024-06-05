import Navbar from "@/components/global/Navbar";
import { LampComponent } from "@/components/global/lamp";
import { InfiniteMovingCards } from "@/components/ui/infinite-cards";
import Link from "next/link";

export default function Home() {
  return (
    <main className="">
      <Navbar />
      <section className="h-screen w-full  bg-neutral-950 rounded-md  !overflow-visible relative flex flex-col items-center  antialiased">
       
      </section>

      <section className="mt-[-800px]">
        <Link className="text-zinc-200 text-3xl font-bold" href={"/words"}>
        <LampComponent />
        </Link>
      </section>
    </main>
  );
}
