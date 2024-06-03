"use client";
import React, { useState } from "react";
import { CardBody, CardContainer, CardItem } from "@/components/global/3d-card";
import { Prisma } from "@prisma/client";
import Translation from "./translation";
import { Button } from "../ui/button";

type Props = {
  words: Prisma.WordsGetPayload<{}>[];
  saveCard: (id:number,rating:number,qtyShown:number|null)=>void
};

function WordCard({ words,saveCard }: Props) {
  const [num, setNum] = useState<number>(0);
  const [isBack, setIsBack] = useState<boolean>(false);
  if(words.length===0) return
  return (
    <div className="flex flex-col mt-32 font-bold gap-6 w-[500px] mx-auto">
      <div className="text-4xl">Total :{words.length}; Current card :{num}</div>
      <CardContainer className="inter-var ">
       
          <CardBody className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-neutral-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-full md:!w-[500px] h-auto min-h-[500px] rounded-xl p-6 border">
            <CardItem
              translateZ="50"
              className=" font-bold text-3xl text-neutral-600 dark:text-white flex justify-center items-center text-center mx-auto"
            >
              <h1 className="md:text-5xl">
                {isBack ? (
                  <Translation
                    word={words[num]}
                    onNext={(rating) => {
                      console.log(rating)
                      saveCard(words[num].id,rating,words[num].qtyShown);
                      setNum(num + 1);
                      setIsBack(false);                     
                    }}
                  />
                ) : (<div className=""><p>{words[num].russian}</p>
                <p className="mt-6 text-blue-400">{words[num].englisch}</p>
                </div>                  
                )}
              </h1>
            </CardItem>
         
          </CardBody>         
        
      </CardContainer>
      <Button   className="text-3xl p-6" onClick={() => {
            setIsBack(!isBack);
          }}>
            turn over
            
        </Button>
    </div>
  );
}

export default WordCard;
