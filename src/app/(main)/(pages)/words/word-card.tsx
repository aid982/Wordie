"use client";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { EditCategorySchema, EditWordSchema } from "@/types";
import { z } from "zod";
import { getCategories, getQtyOfCards, getWords, saveCard_onNext, saveCard_onUpdateCreate, saveCategory } from "./actions";
import { User } from "next-auth";
import { Button } from "@/components/ui/button";
import WordForm from "@/components/forms/word-form";
import CategoryForm from "@/components/forms/category-form";
import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Translation from "../../../../components/words-card-components/translation";
import { MultiSelect } from "@/components/ui/multi-select";
import { getOptionsForMultiSelect } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";


type Props = {
  user: User
};

function WordCard({ user }: Props) {
  const queryClient = useQueryClient();
  const [filterByCategories, setfilterByCategories] = useState<string[]>([]);
  const [num, setNum] = useState<number>(0);
  const [globalNum, setGlobalNum] = useState<number>(0);
  const [curPage, setCurPage] = useState<number>(0);
  const [isBack, setIsBack] = useState<boolean>(false);

  const { data: dataFromInfiniteQuery, status, error, fetchNextPage } = useInfiniteQuery({
    queryKey: ['get-words', filterByCategories],
    queryFn: async () => {
      console.log('ee')
      return await getWords({ user, categoriesIds: filterByCategories })
    },
    refetchOnMount: false,
    staleTime: Infinity,
    initialPageParam: 0,
    getNextPageParam: (lastPage, _, lastPageParam) => {
      if (lastPage.length === 0) {
        return undefined
      }
      return lastPageParam + 1
    },
  })

  const curWord = status === 'success' ? dataFromInfiniteQuery?.pages[curPage][num] : undefined;
  const curWordArray = status === 'success' ? dataFromInfiniteQuery?.pages[curPage] : undefined;



  const { data: categories } = useQuery({
    queryKey: ['get-categories'],
    queryFn: async () => await getCategories(user),
    refetchOnMount: false,
    staleTime: Infinity
  })

  const { data: qtyOfWords } = useQuery({
    queryKey: ['get-qty-cards', filterByCategories],
    queryFn: async () => await getQtyOfCards({ user, categoriesIds: filterByCategories }),
    refetchOnMount: false,
    staleTime: Infinity
  })


  const totalQtyOfCard = qtyOfWords?._count ? qtyOfWords?._count.id : 0;

  const { mutateAsync: onNextCardAsync, mutate: onNextCard } = useMutation({
    mutationKey: ['next-card'],
    mutationFn: saveCard_onNext
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
      if (filterByCategories.length > 0) queryClient.invalidateQueries({ queryKey: ['get-words', filterByCategories] });
    },
    onMutate: async (curWord) => {
      if (filterByCategories.length === 0) {
        // Cancel any outgoing refetches
        // (so they don't overwrite our optimistic update)      
        if (false || !curWord.newCard) {
          await queryClient.cancelQueries({ queryKey: ['get-words', filterByCategories] })
          const dat = queryClient.getQueryCache();
          console.log(dat)

          queryClient.invalidateQueries()

          // Snapshot the previous value
          const previousWords = queryClient.getQueryData(['get-words', filterByCategories])
          console.log(Array.isArray(previousWords))
          console.log(previousWords)

          if (Array.isArray(previousWords)) {

            const prevWord = previousWords[num];

            previousWords[num] = {
              ...prevWord,
              ...curWord.word

            };
            // Optimistically update to the new value
            queryClient.setQueryData(['get-words', filterByCategories], previousWords)
          }
        }
      }
    },
  })

  const onChangeFilterByCategory = (value: string[]) => {
    setNum(0);
    setGlobalNum(0);
    setIsBack(false);
    setCurPage(0);
    setfilterByCategories(value);
    queryClient.invalidateQueries({ queryKey: ['get-words', filterByCategories] })

  }


  const onNextButtonClick = async (rating: number) => {
    if (!curWordArray || !curWord) return;
    if (num < curWordArray.length - 1) {
      onNextCard({ id: curWord.id, userRating: rating, prevRating: curWord.rating, qtyShown: curWord.qtyShown, user: user });
      setNum(num + 1);
    } else {
      await onNextCardAsync({ id: curWord.id, userRating: rating, prevRating: curWord.rating, qtyShown: curWord.qtyShown, user: user });
      await fetchNextPage();
      setNum(0);
      setCurPage(curPage + 1)
    }    
    if (globalNum + 1 === totalQtyOfCard) { setGlobalNum(0) }
    else { setGlobalNum(globalNum + 1); }
    setIsBack(false);
  }




  return (
    <div className="flex flex-col mt-20 font-bold gap-6 max-w-3xl mx-auto">
      {categories && <MultiSelect
        options={getOptionsForMultiSelect(categories)}
        onValueChange={onChangeFilterByCategory}
        defaultValue={filterByCategories}
        placeholder="Filter by category"
        variant="inverted"
        animation={2}
        maxCount={3}
      />}

      <div className="md:text-4xl flex justify-center gap-5">
        {" "}

        <div className=" flex">
          Total :{totalQtyOfCard}; Current card :{globalNum + 1}
        </div>
      </div>

      {(status === 'pending') ? (
        <div className="max-w-3xl mx-auto">          
          <div className="space-y-5 max-w-3xl">                        
            <Skeleton className="min-h-[300px]" />
            <Skeleton className="min-h-[30px] w-[400px]" />
          </div>
        </div>
      ) : status === 'error' ? (
        <div className="max-w-3xl mx-auto">          
          <p>Error: {error.message}</p>
        </div>
      ) : curWord && curWordArray ?
        <>
          <Card>
            <CardContent className="max-w-3xl bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-neutral-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-full  md:min-h-[300px]  rounded-xl p-6 border">
              <h1 className="max-w-2xl font-bold text-3xl text-neutral-600 dark:text-white flex justify-center items-center text-center mx-auto md:text-5xl">
                {isBack ? (
                  <Translation
                    word={curWord}
                    onNext={onNextButtonClick}
                  />
                ) : (
                  <div className="">
                    <p>{curWord.russian}</p>
                    <p className="mt-6 text-blue-400">{curWord.englisch}</p>
                  </div>
                )}
              </h1>
            </CardContent>
            <CardFooter className="flex flex-row justify-center gap-3 mt-3">
              <WordForm
                fill={true}
                className="bg-blue-400 rounded-xl md:text-2xl md:p-6"
                name="Edit"
                word={curWord}
                categories={categories}
                onUpdate={(values: z.infer<typeof EditWordSchema>) =>
                   onUpdateCard({ word: values, id: curWord.id, newCard: false, user })
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
          </Card>
          <div className="flex flex-row justify-between p-10 gap-3">
            <WordForm
              fill={false}
              className="bg-green-600 md:text-2xl p-3 md:p-5 rounded-xl "
              name="+ card"
              word={curWord}
              categories={categories}
              onUpdate={(values: z.infer<typeof EditWordSchema>) =>
                 onUpdateCard({ word: values, id: curWord.id, newCard: true, user })
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
        </> : <></>}
    </div>
  );
}

export default WordCard;
