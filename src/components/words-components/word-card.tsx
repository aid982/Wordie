"use client";
import React, { useState } from "react";
import { Prisma } from "@prisma/client";
import Translation from "./translation";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import WordForm from "../forms/word-form";
import { EditWordSchema } from "@/types";
import { z } from "zod";

type Props = {
  words: Prisma.WordsGetPayload<{}>[];
  saveCard: (id: number, rating: number, qtyShown: number | null) => void;
  onUpdate: (values: z.infer<typeof EditWordSchema>, id: number,newCard:boolean) => void;
};

function WordCard({ words, saveCard, onUpdate }: Props) {
  const [num, setNum] = useState<number>(0);
  const [isBack, setIsBack] = useState<boolean>(false);
  if (words.length === 0) return;
  return (
    <div className="flex flex-col mt-32 font-bold gap-6 max-w-3xl mx-auto">
      <div className="text-4xl flex justify-center">
        Total :{words.length}; Current card :{num + 1}
      </div>
      <Card>
        <CardContent className="max-w-3xl bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-neutral-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-full  h-auto min-h-[500px] rounded-xl p-6 border">
          <h1 className="max-w-2xl font-bold text-3xl text-neutral-600 dark:text-white flex justify-center items-center text-center mx-auto md:text-5xl">
            {isBack ? (
              <Translation
                word={words[num]}
                onNext={(rating) => {
                  console.log(rating);
                  saveCard(words[num].id, rating, words[num].qtyShown);
                  setNum(num + 1);
                  setIsBack(false);
                }}
              />
            ) : (
              <div className="">
                <p>{words[num].russian}</p>
                <p className="mt-6 text-blue-400">{words[num].englisch}</p>
              </div>
            )}
          </h1>
        </CardContent>
        <CardFooter className="flex justify-center items-center gap-5">
          <WordForm fill={false}
            className="bg-green-600"
            name="Add new"
            word={words[num]}
            onUpdate={(values: z.infer<typeof EditWordSchema>) =>
              onUpdate(values, words[num].id,true)
            }
          />
          <WordForm fill={true}
            className="bg-blue-400 rounded-xl"
            name="Edit"
            word={words[num]}
            onUpdate={(values: z.infer<typeof EditWordSchema>) =>
              onUpdate(values, words[num].id,false)
            }            
          />
          <Button 
            className="text-3xl p-6 mt-5"
            onClick={() => {
              setIsBack(!isBack);
            }}
          >
            turn over
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default WordCard;
