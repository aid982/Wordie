"use client";
import React from "react";
import { IconBrandGithub, IconBrandGoogle } from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import { providerMap, signIn } from "@/auth";
import { useRouter, useSearchParams } from "next/navigation";

export function SignupForm({
  submit,
}: {
  submit: (form: FormData, providerId: string) => void;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const origin = searchParams.get("origin");
  console.log(origin)
  return (
    <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
      <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
        Welcome to Wordie
      </h2>
      <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
        Login to procceed
      </p>
      <div>
        <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />

        <div className="flex flex-col space-y-4">
          {Object.values(providerMap).map((provider) => (
            <form
              key={provider.id}
              className="my-8"
              action={(form) => {
                console.log(form);
                submit(form, provider.id);
                if (origin) {
                  router.push(`/${origin}`);
                  return;
                } else {
                  router.push("/");                  
                }
                
              }}
            >
              <button
                type="submit"
                className=" relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)] mb-5"
              >

                {provider.id==="google" ?<IconBrandGoogle className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />:<></> }
                {provider.id==="github" ?<IconBrandGithub className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />:<></> }
                <span className="text-neutral-700 dark:text-neutral-300 text-sm">
                  {provider.name}
                </span>
                <BottomGradient />
              </button>
            </form>
          ))}
        </div>
      </div>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
