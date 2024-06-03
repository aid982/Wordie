import { Prisma } from "@prisma/client";

export type Word_Card = {
  russian: string;
  german: string;
  auxiliaryVerb?: string|null;
  declination: string[];
};

const tt : Prisma.WordsSelect ={
  declination:true

}
