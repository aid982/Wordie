import { Prisma } from "@prisma/client";
import React from "react";
import { Button } from "../ui/button";

type Props = {
  word: Prisma.WordsGetPayload<{
    select: {
      auxiliaryVerb: true;
      declination: true;
      german: true;
      id: true;
    };
  }>;
  onNext: (rating:number) => void;
};

function Translation({ word, onNext }: Props) {
  return (
    <div className="gap-3">
      <p className="text-primary">{word.german}</p>
      <p className="text-blue-400 text-2xl mt-10">
         {word.auxiliaryVerb ? ` Hilfsverb ${word.auxiliaryVerb}`:''}
      </p>
      <div className="text-3xl mt-3 text-secondary-foreground">
        {word.declination &&
          word.declination.map((decl, index) => <p key={index}>{decl}</p>)}
      </div>
      <div className="flex flex-col  md:flex-row justify-center gap-5 mt-5 ">
        <Button   className="text-3xl p-6" onClick={()=>onNext(1)}>
          Poor
        </Button>
        <Button   className="bg-blue-500 text-3xl p-6" onClick={()=>onNext(2)}>
          Good
        </Button>
        <Button   className="bg-green-700 text-3xl p-6" onClick={()=>onNext(3)}>
          Very good
        </Button>
      </div>
    </div>
  );
}

export default Translation;
