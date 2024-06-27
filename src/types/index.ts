import { z } from "zod";

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
  });

  export const EditCategorySchema = z.object({
    name: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    })    
  });