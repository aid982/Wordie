
import { saveJSON_WORDS } from "@/app/actions";
import { auth } from "@/auth";
import Tiptap from "@/components/editor/Editor";
import React from "react";

const  AddJSONPage =async  () => {
  const session = await auth();
  const user = session?.user;
  if (!user) return;
  const saveJSON = async (data: String) => {
    "use server";
    await saveJSON_WORDS(data,user.id);
  };
  return (
    <div className="">
      <Tiptap saveJSON={saveJSON} />
    </div>
  );
};

export default AddJSONPage;
