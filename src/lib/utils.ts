import { EditCategorySchema } from "@/types"
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { z } from "zod"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getOptionsForMultiSelect = (categories: z.infer<typeof EditCategorySchema>[]) => {
  return categories.map((val) => ({
    value: val.id.toString(),
    label: val.name,
  }))
}
