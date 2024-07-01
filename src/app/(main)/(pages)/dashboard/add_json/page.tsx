
import { saveJSON_WORDS } from "@/actions";
import { auth } from "@/auth";
import Tiptap from "@/components/editor/Editor";
import JsonView from "@/components/editor/JsonView";
import React from "react";

const  AddJSONPage =async  () => {
  const session = await auth();
  const user = session?.user;
  if (!user) return;
  const saveJSON = async (data: String) => {
    "use server";
    await saveJSON_WORDS(data,user.id,null);
  };
  return (
    <div className="">
      <JsonView/>
    </div>
  );
};

export default AddJSONPage;
