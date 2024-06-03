import ProfileForm from "@/components/forms/profile-form";
import React from "react";
import ProfilePicture from "./_components/profile-picture";
import { auth } from "@/auth";
import { UploadFile } from "./_components/upload-care-button";
import { db } from "@/lib/db";
import { date } from "zod";

 async function   Settings() {
  const session = await auth();  
 
  const onDelete = async ()=>{
    'use server'    
    const id = session?.user?.id;
    const response = await db.user.update({
      where: {
        id: id,
      },
      data: {
        image: '',
      },
    })   
    return response;    
  }

  const onUpload = async (file:string) => {
    'use server'
    const id = session?.user?.id;
    const response = await db.user.update({
      where: {
        id: id,
      },
      data: {
        image: file,
      },
    })   
    return response; 
  }
  if(!session) return;
  const image = session.user!.image;  
  return (
    <div className="flex flex-col gap-4">
      <h1 className="sticky top-0 z-[10] flex items-center justify-between border-b bg-background/50 p-6 text-4xl backdrop-blur-lg">
        <span>Settings</span>
      </h1>
      <div className="flex flex-col gap-10 p-6">
        <div>
          <h2 className="text-2xl font-bold">User Profile</h2>

          <p className="text-base text-white/50">
            Add or update your information
          </p>
        </div>
        <ProfilePicture onUpload={onUpload} userImage={image} onDelete={onDelete}/>
        <ProfileForm />
      </div>
    </div>
  );
}

export default Settings;
