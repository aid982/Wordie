"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Loader2 } from "lucide-react";

type Props = {};

const EditUserProfileSchema = z.object({
  name: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Enter valid e-mail",
  }),
});

function ProfileForm({}: Props) {
  const [isLoading, setIsLoading] = useState(false);

  // 1. Define your form.
  const form = useForm<z.infer<typeof EditUserProfileSchema>>({
    mode: "onChange",
    resolver: zodResolver(EditUserProfileSchema),
    defaultValues: {
      name: "",
      email: "",
    },
  });

  return (
    <Form {...form}>
      <form className="flex flex-col gap-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Name" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>E-mail</FormLabel>
              <FormControl>
                <Input placeholder="myemail@gmail.com" {...field} />
              </FormControl>
              <FormDescription>
                This is your email
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">
        {isLoading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin"/></>:('Save user Settings')}
        </Button>
      </form>
    </Form>
  );
}

export default ProfileForm;
