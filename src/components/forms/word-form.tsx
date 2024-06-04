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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Loader2 } from "lucide-react";
import { Prisma } from "@prisma/client";
import { EditWordSchema } from "@/types";
import { cn } from "@/lib/utils";

type Props = {  
  className:string|undefined
  name: string;
  word: Prisma.WordsGetPayload<{
    select: {
      russian: true;
      german: true;
      englisch: true;
      auxiliaryVerb: true;
      declination: true;
    };
  }>;
  fill:boolean,
  onUpdate:(values:z.infer<typeof EditWordSchema>)=>void
};


function WordForm({ name, word, onUpdate,className,fill}: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);


  

  const form = useForm<z.infer<typeof EditWordSchema>>({
    mode: "onChange",
    resolver: zodResolver(EditWordSchema),            
    resetOptions: {
      keepDirtyValues: false, // user-interacted input will be retained
      keepErrors: true, // input errors will be retained with value update
    },
  });

  useEffect(() => {
    if(fill)
    form.reset({ ...word })
  }, [word])

  const handleSubmit = async (values: z.infer<typeof EditWordSchema>) => {    
    setIsLoading(true);
    await onUpdate(values)
    setIsLoading(false);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen} >
      <DialogTrigger    
        
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        <Button variant="secondary" className={cn(
          "text-3xl p-6 mt-5",
          className
        )}>{name}</Button>
        
      </DialogTrigger>
      <DialogContent className="max-w-3xl " onAbort={() => {
          setIsOpen(false);
        }}>
        <DialogHeader>
          <DialogTitle>Word card</DialogTitle>
          <DialogDescription className="text-zinc-100">
            <Form {...form}>
              <form
                className="flex flex-col gap-6 "
                onSubmit={form.handleSubmit(handleSubmit)}
              >
                <FormField
                  control={form.control}
                  name="russian"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>russian</FormLabel>
                      <FormControl>
                        <Input
                          className="text-3xl"
                          placeholder="russian"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="german"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>german</FormLabel>
                      <FormControl>
                        <Input
                          className="text-3xl"
                          placeholder="german"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="englisch"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>englisch</FormLabel>
                      <FormControl>
                        {
                          //@ts-ignore
                          <Input
                            className="text-3xl"
                            placeholder="englisch"
                            {...field}
                          />
                        }
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="auxiliaryVerb"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>auxiliaryVerb</FormLabel>
                      <FormControl>
                        {
                          //@ts-ignore
                          <Input
                            className="text-3xl"
                            placeholder="auxiliaryVerb"
                            {...field}
                          />
                        }
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-2 col-span-1 ">
                  <FormField
                    control={form.control}
                    name="declination"
                    render={() => (
                      <FormItem>
                        <FormLabel>declination (ich)</FormLabel>
                        <FormControl>
                          {
                            //@ts-ignore
                            <Input
                              className="text-3xl"
                              placeholder="declination"
                              {...form.register("declination.0")}
                            />
                          }
                        </FormControl>
                        <FormMessage className="text-red-500" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="declination"
                    render={() => (
                      <FormItem>
                        <FormLabel>declination (du)</FormLabel>
                        <FormControl>
                          {
                            //@ts-ignore
                            <Input
                              className="text-3xl"
                              placeholder="declination"
                              {...form.register("declination.1")}
                            />
                          }
                        </FormControl>
                        <FormMessage className="text-red-500" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="declination"
                    render={() => (
                      <FormItem>
                        <FormLabel>declination (er/sie/es)</FormLabel>
                        <FormControl>
                          {
                            //@ts-ignore
                            <Input
                              className="text-3xl"
                              placeholder="declination"
                              {...form.register("declination.2")}
                            />
                          }
                        </FormControl>
                        <FormMessage className="text-red-500" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="declination"
                    render={() => (
                      <FormItem>
                        <FormLabel>declination (wir)</FormLabel>
                        <FormControl>
                          {
                            //@ts-ignore
                            <Input
                              className="text-3xl"
                              placeholder="declination"
                              {...form.register("declination.3")}
                            />
                          }
                        </FormControl>
                        <FormMessage className="text-red-500" />
                      </FormItem>
                    )}
                  />
                </div>

                <Button type="submit">
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    </>
                  ) : (
                    "Save user Settings"
                  )}
                </Button>
              </form>
            </Form>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default WordForm;
