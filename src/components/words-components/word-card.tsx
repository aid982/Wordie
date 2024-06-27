"use client";
import React, { useState } from "react";
import { Prisma } from "@prisma/client";
import Translation from "./translation";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import WordForm from "../forms/word-form";
import { EditCategorySchema, EditWordSchema, WordTypeFromDB } from "@/types";
import { z } from "zod";
import CategoryForm from "../forms/category-form";

type Props = {
  words: WordTypeFromDB[];
  categories: z.infer<typeof EditCategorySchema>[],
  saveCard: (id: number, newRating: number, prevRating: number | null, qtyShown: number | null) => void;
  onUpdate: (
    values: z.infer<typeof EditWordSchema>,
    id: number,
    newCard: boolean
  ) => void;
  onAddCategory: (values: z.infer<typeof EditCategorySchema>,
  ) => void;


};

function WordCard({ words, categories,saveCard, onUpdate, onAddCategory }: Props) {
  const [num, setNum] = useState<number>(0);
  const [isBack, setIsBack] = useState<boolean>(false);  
  if (words.length === 0) return;
  return (
    <div className="flex flex-col mt-20 font-bold gap-6 max-w-3xl mx-auto">
      <div className="md:text-4xl flex justify-center gap-5">
        {" "}

        <div className=" flex">
          Total :{words.length}; Current card :{num + 1}
        </div>
      </div>
      <Card>
        <CardContent className="max-w-3xl bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-neutral-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-full  md:min-h-[300px]  rounded-xl p-6 border">
          <h1 className="max-w-2xl font-bold text-3xl text-neutral-600 dark:text-white flex justify-center items-center text-center mx-auto md:text-5xl">
            {isBack ? (
              <Translation
                word={words[num]}
                onNext={(rating) => {                  
                  saveCard(words[num].id, rating, words[num].rating, words[num].qtyShown);
                  if(num<words.length-1) setNum(num + 1);
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
        <CardFooter className="flex flex-row justify-center gap-3 mt-3">
          <WordForm
            fill={true}
            className="bg-blue-400 rounded-xl md:text-2xl md:p-6"
            name="Edit"
            word={words[num]}
            categories={categories}
            onUpdate={(values: z.infer<typeof EditWordSchema>) =>
              onUpdate(values, words[num].id, false)
            }
          />
          <Button
            className="rounded-xl md:text-2xl md:p-6"
            onClick={() => {
              setIsBack(!isBack);
            }}
          >
            turn over
          </Button>

        </CardFooter>
      </Card>
      <div className="flex flex-row justify-between p-10">
        <WordForm
          fill={false}
          className="bg-green-600 md:text-2xl p-3 md:p-5 rounded-xl "
          name="+ card"
          word={words[num]}
          categories={categories}
          onUpdate={(values: z.infer<typeof EditWordSchema>) =>
            onUpdate(values, words[num].id, true)
          }
        />

        <CategoryForm
        categories={categories}
          className="bg-blue-500 md:text-2xl md:p-6 rounded-xl "
          name="+ Category"
          onUpdate={(values: z.infer<typeof EditCategorySchema>) => {
            console.log(values);
            onAddCategory(values)
          }
          }
        />
      </div>

      
    </div>
  );
}

export default WordCard;
