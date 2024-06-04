import { z } from "zod";

export const EditWordSchema = z.object({
    russian: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
    german: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
    englisch: z.string().nullable(),
    auxiliaryVerb: z.string().nullable(),
    declination: z.array(z.string()),
  });