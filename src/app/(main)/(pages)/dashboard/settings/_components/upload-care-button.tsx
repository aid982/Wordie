"use client";
import { FileUploaderRegular } from "@uploadcare/react-uploader";
import "@uploadcare/react-uploader/core.css";
import { useState } from "react";


type FileItems ={
    allEntries:File[]
}
export type UploadFile = {
    status:string
    cdnUrl:string
    uuid:string
    fileInfo :{
        originalFilename:string
    }
}
type Props = {
    onUpload: (fileUrl:string) =>void
};

function UploadCareButton({onUpload}: Props) {

  const handleChangeEvent = (items:any) => {
    
    if(items.allEntries.length>0) {
        if(items.allEntries[0].status === "success" ) 
            onUpload(items.allEntries[0].cdnUrl)
    }
    
  };
  return (
    <FileUploaderRegular
      pubkey="4afb6928c0a43f098789"
      maxLocalFileSizeBytes={10000000}
      multiple={false}
      imgOnly={true}
      sourceList="local, url, camera, dropbox"
      onChange={handleChangeEvent}
    />
  );
}

export default UploadCareButton;
