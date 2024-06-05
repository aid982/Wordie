"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { menuOptions } from "@/lib/constant";
import { cn } from "@/lib/utils";
import { Separator } from "../ui/separator";
import { Database, GitBranch, LucideMousePointerClick } from "lucide-react";
import { ModeToggle } from "../global/mode-toggle";

type Props = {};

function MenuOptions({}: Props) {
  const pathname = usePathname();
  return (
    <nav
      className="dark:bg-black h-screen overflow-scroll justify-between flex 
  items-center flex-col gap-10 py-6"
    >
      <div className="flex items-center flex-col gap-10 justify-center">
        <Link href="/" className="flex font-bold flex-row">
          Wordie
        </Link>
        <TooltipProvider>
          {menuOptions.map((data) => (
            <ul key={data.name}>
              <Tooltip delayDuration={0}>
                <TooltipTrigger>
                  <Link
                    className={cn(
                      "group  flex items-center justify-center scale-[1.5] rounded-lg p-[3px]",
                      {
                        "dark:bg-slate-800": pathname === data.href,
                      }
                    )}
                    href={data.href}
                  >
                    <data.Component selected={pathname === data.href} />
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right" className="backdrop-blur-xl">
                  <p>{data.name}</p>
                </TooltipContent>
              </Tooltip>
            </ul>
          ))}
        </TooltipProvider>
        <Separator />
      </div>
      <div className="flex items-center justify-centerflex-col gap-8">
        <ModeToggle />
      </div>
    </nav>
  );
}

export default MenuOptions;
