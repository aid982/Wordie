"use client";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { EditCategorySchema, EditWordSchema } from "@/types";
import { z } from "zod";
import { getCategories, getWords, saveCard_onNext, saveCard_onUpdateCreate, saveCategory } from "./actions";
import { User } from "next-auth";
import { Button } from "@/components/ui/button";
import WordForm from "@/components/forms/word-form";
import CategoryForm from "@/components/forms/category-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Translation from "./translation";
import { MultiSelect } from "@/components/ui/multi-select";
import { getOptionsForMultiSelect } from "@/lib/utils";


type Props = {
  user: User

};

function WordCard({ user }: Props) {
  //const searchParams = useSearchParams()
  //const categoriesIds = searchParams.getAll('categoriesIds')
  const queryClient = useQueryClient()

  const [filterByCategories, setfilterByCategories] = useState<string[]>([])


  const [num, setNum] = useState<number>(0);
  const [isBack, setIsBack] = useState<boolean>(false);

  const { data: words } = useQuery({
    queryKey: ['get-words', filterByCategories],
    queryFn: async () => await getWords({ user, categoriesIds: filterByCategories }),
    refetchOnMount: false,
    staleTime: Infinity
  })

  const { data: categories } = useQuery({
    queryKey: ['get-categories'],
    queryFn: async () => await getCategories(user),
    refetchOnMount: false,
    staleTime: Infinity
  })

  const { mutate: onNextCard } = useMutation({
    mutationKey: ['next-card'],
    mutationFn: saveCard_onNext,
    onSuccess: (data) => {
      console.log('Card is saved onNext');
    }

  })


  const { mutate: onAddCategory } = useMutation({
    mutationKey: ['save-category'],
    mutationFn: saveCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['get-categories'] })
    }
  })

  const { mutate: onUpdateCard } = useMutation({
    mutationKey: ['update-card'],
    mutationFn: saveCard_onUpdateCreate,
    onSuccess: () => {
      console.log('Card is saved');
    },
    onMutate: async (curWord) => {
      // Cancel any outgoing refetches
      // (so they don't overwrite our optimistic update)
      if (!curWord.newCard) {
        await queryClient.cancelQueries({ queryKey: ['get-words'] })

        // Snapshot the previous value
        const previousWords = queryClient.getQueryData(['get-words'])
        console.log(Array.isArray(previousWords))
        console.log(previousWords)

        if (Array.isArray(previousWords)) {

          const prevWord = previousWords[num];

          previousWords[num] = {
            ...prevWord,
            ...curWord.word

          };
          // Optimistically update to the new value
          queryClient.setQueryData(['get-words'], previousWords)
        }
      }

    },

  })


  if (!words) return <></>;

  return (
    <div className="flex flex-col mt-20 font-bold gap-6 max-w-3xl mx-auto">
      {categories&&<MultiSelect
        options={getOptionsForMultiSelect(categories)}
        onValueChange={setfilterByCategories}
        defaultValue={filterByCategories}
        placeholder="Filter by category"
        variant="inverted"
        animation={2}
        maxCount={3}
      />}
      
      <div className="md:text-4xl flex justify-center gap-5">
        {" "}

        <div className=" flex">
          Total :{words.length}; Current card :{num + 1}
        </div>
      </div>
      {words.length===0 ? <></>:<Card>
        <CardContent className="max-w-3xl bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-neutral-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-full  md:min-h-[300px]  rounded-xl p-6 border">
          <h1 className="max-w-2xl font-bold text-3xl text-neutral-600 dark:text-white flex justify-center items-center text-center mx-auto md:text-5xl">
            {isBack ? (
              <Translation
                word={words[num]}
                onNext={(rating) => {
                  onNextCard({ id: words[num].id, userRating: rating, prevRating: words[num].rating, qtyShown: words[num].qtyShown, user: user });
                  if (num < words.length - 1) setNum(num + 1);
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
            onUpdate={async (values: z.infer<typeof EditWordSchema>) =>
              await onUpdateCard({ word: values, id: words[num].id, newCard: false, user })
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
      </Card>}
      
      <div className="flex flex-row justify-between p-10 gap-3">
        <WordForm
          fill={false}
          className="bg-green-600 md:text-2xl p-3 md:p-5 rounded-xl "
          name="+ card"
          word={words[num]}
          categories={categories}
          onUpdate={async (values: z.infer<typeof EditWordSchema>) =>
            await onUpdateCard({ word: values, id: words[num].id, newCard: true, user })
          }
        />

        <CategoryForm
          categories={categories}
          className="bg-blue-500 md:text-2xl md:p-6 rounded-xl "
          name="+ Category"
          onUpdate={(values: z.infer<typeof EditCategorySchema>) => {
            onAddCategory({ values, user })
          }
          }
        />
      </div>


    </div>
  );
}

export default WordCard;
