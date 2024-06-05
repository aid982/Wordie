"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { Label } from "@radix-ui/react-dropdown-menu";
import Link from "next/link";

type Props = {
  link: string;
};

function ShareLink({ link }: Props) {
  const [show, setShow] = useState<boolean>(false);

  return (
    <div className="flex gap-3 justify-center items-center text-3xl">
      <Button
        className="text-3xl"
        onClick={() => {
          setShow(true);
        }}
      >
        Generate link for scharing
      </Button>
      {show && (
        <Link href={link}>
          <Label className="text-3xl">{link}</Label>
        </Link>
      )}
    </div>
  );
}

export default ShareLink;
