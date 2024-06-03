"use client";
import { Button } from "../ui/button";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useState } from "react";

type Props = {
  saveJSON: (data: String) => void;
};

const Tiptap = ({ saveJSON }: Props) => {
  const [text, setText] = useState("");
  const [textJSON, setTextJSON] = useState("");

  return (
    <div className="gap-6 scroll-auto">
      <ReactQuill
        className=""
        theme="snow"
        value={text}
        onChange={(content, delta, source, editor) => {
          setText(content);
          var data = editor.getContents().ops;
          if (data) {
            var str = data[0].insert;
            console.log(str)
            setTextJSON(str)          
            
          }
        }}
      />
      <Button
        className="mt-5"
        onClick={() => {
          console.log('eee')
          console.log(textJSON)

          if (textJSON) {
            console.log(textJSON)
            try {
              var text = `[
                {
               
                 "russian": "писать (что-л.)",
               
                 "englisch": "to write sth. | wrote, written |",
               
                 "german": "(etw.) akk schreiben | schrieb, geschrieben |",
               
                 "auxiliaryVerb": "haben",
               
                 "declination": ["ich schreibe", "du schreibst", "er/sie/es schreibt", "wir schreiben", "ihr schreibt", "sie schreiben"]
               
                } 
               
               ]`;
              console.log(text)
              const result1 = JSON.parse(text);
              console.log(result1);
              
              console.log(textJSON);
              let escapedText = textJSON
                .replaceAll(/\\/g, "\\\\")
                .replaceAll(/"/g, '\\"');
              // Remove control characters
              let cleanText = `${textJSON}`.replaceAll('\n', '').replaceAll(' \' ','');                           
              console.log(cleanText)

              const result = JSON.parse(cleanText);
              console.log(result);
              saveJSON(result);
            } catch (error) {
              console.log(error);
            }
          }
        }}
      >
        Save{" "}
      </Button>
    </div>
  );
};

export default Tiptap;
