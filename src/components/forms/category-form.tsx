"use client";
import React, { SyntheticEvent, useEffect, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { set, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Loader2 } from "lucide-react";
import { EditCategorySchema, EditWordSchema } from "@/types";
import { cn } from "@/lib/utils";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/select";

type Props = {
  className: string | undefined,
  name: string,
  categories: z.infer<typeof EditCategorySchema>[],
  onUpdate: (values: z.infer<typeof EditCategorySchema>) => void,
};

function CategoryForm({ name, onUpdate,categories, className }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const form = useForm<z.infer<typeof EditCategorySchema>>({
    mode: "onChange",
    resolver: zodResolver(EditCategorySchema),
    defaultValues: {
      name: "",
      id: 0
    }
  });

  const handleSubmit = async (values: z.infer<typeof EditCategorySchema>) => {
    console.log('sdf',values)
    setIsLoading(true);
    await onUpdate(values);
    setIsLoading(false);
    setIsOpen(false);
  };
  const inputClassName = "text-xs md:text-3xl";

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild
        onClick={() => {
          setIsOpen(!isOpen);
          form.reset({
            id:0,
            name:""
          })

        }}
      >
        <Button variant="secondary" className={cn(className)}>
          {name}
        </Button>
      </DialogTrigger>
      <DialogContent
        className=" max-w-xs sm:max-w-2xl z-[110]  md:mt-10 md:max-w-4xl overflow-y-scroll max-h-[calc(100%-5rem)] "
        onAbort={() => {
          setIsOpen(false);
        }}
      >
        <DialogHeader>
          <DialogTitle className={inputClassName}>Category</DialogTitle>
          <DialogDescription className="text-zinc-100">

          </DialogDescription>
        </DialogHeader>

        <Select onValueChange={(value)=>{            
            const curEl =categories.find((val)=>val.id.toString()===value)
            if(curEl) form.reset({
              id:+value,
              name:curEl.name
            })           

          }}>
          <SelectTrigger className="">
            <SelectValue placeholder="Select existing category" />
          </SelectTrigger>
          <SelectContent className="z-[120]" >
            <SelectGroup>
              {categories.map((category)=>(<SelectItem key={category.id} value={category.id.toString()}>{category.name}</SelectItem>))}              
              
            </SelectGroup>
          </SelectContent>
        </Select>


        <Form {...form}>
          <form
            className="flex flex-col gap-6"
            onSubmit={form.handleSubmit(handleSubmit)}
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>name</FormLabel>
                  <FormControl >
                    <Input
                      className={inputClassName}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />


            <Button type="submit">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                </>
              ) : (
                "Save card"
              )}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default CategoryForm;
