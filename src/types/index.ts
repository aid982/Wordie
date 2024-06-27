import { z } from "zod";
import { Prisma } from "@prisma/client";


export const EditCategorySchema = z.object({
  name: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  id: z.number(),

});

export const EditWordSchema = z.object({
  russian: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  german: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  englisch: z.string().optional().nullish(),
  auxiliaryVerb: z.string().optional().nullish(),
  declination: z.array(z.string()),
  categories_tmp: z.array(z.string()).optional(),
  categories: z.array(EditCategorySchema).optional()
});


export type WordTypeFromDB = Prisma.WordsGetPayload<{include:{categories:{
  select:{
    category:{
      select:{
        name:true
        id:true
      }
    }
  }
}}}>