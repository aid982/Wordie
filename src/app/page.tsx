import { CardBody, CardContainer, CardItem } from "@/components/global/3d-card";
import Navbar from "@/components/global/Navbar";
import { Button } from "@/components/ui/button";
import { ContainerScroll } from "@/components/ui/conteiner-scroll-animation";
import { HeroParallax } from "@/components/ui/hero-parallax";
import { InfiniteMovingCards } from "@/components/ui/infinite-cards";
import { LampContainer, LampComponent } from "@/components/ui/lamp";
import { clients, products } from "@/lib/constant";
import { CheckIcon } from "lucide-react";
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
