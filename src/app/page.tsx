
import Navbar from "@/components/global/Navbar";
import Link from "next/link";

export default function Home() {
  return (
    <main className="">
      <Navbar />
      <section className="h-screen w-full  bg-neutral-950 rounded-md  !overflow-visible relative flex flex-col items-center  antialiased">
        <div className="absolute inset-0  h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_35%,#223_100%)]">
          <div className="flex h-screen  w-full items-center justify-center">
            <Link className="text-3xl font-bold" href={"/words"}>Get Started</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
