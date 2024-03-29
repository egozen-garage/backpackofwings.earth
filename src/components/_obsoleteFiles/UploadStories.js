import React from "react";
import { useState } from "react";
import { UploadStoriesIntro } from "../UploadStoriesIntro.js";
import StoryInputForm from "../StoryInputForm.js";
import "../css/menuButtons.css"

export function UploadStories({handleZoom}) {
  handleZoom(true);
  const [isOpen, setIsOpen] = useState(true);
  // const toggleRightPanel = () => {
  //   setIsOpen((prevState) => !prevState);
  // };

  return (
    <>
      {/* JONAS INTRO POP-UP */}
      <div className="z-50 bg-blue-60 w-full h-full fixed top-0">checkchec</div>
      {/* <UploadStoriesIntro></UploadStoriesIntro> */}

      {/* STORIES INPUT TEXT CONTAINER */}
      <StoryInputForm/>

        
    {/* STORIES MATERIAL CONTAINER */}
    <div class="z-30 row-start-1 row-span-2 col-span-2 my-6">
        <div class="flex overflow-x-scroll scrollbar-hide">
            <div class="bg-white rounded-2xl w-80 h-[200px] mx-6 shrink-0 p-6">
                material 01 Ken
            </div>
            <div class="bg-white rounded-2xl w-80 h-[200px] mx-6 shrink-0 p-6">
                material 03 Ken
            </div>
            <div class="bg-white rounded-2xl w-80 h-[200px] mx-6 shrink-0 p-6">
                material 03
            </div>
            <div class="bg-white rounded-2xl w-80 h-[200px] mx-6 shrink-0 p-6">
                material 04
            </div>
            <div class="bg-white rounded-2xl w-80 h-[200px] mx-6 shrink-0 p-6">
                material 05
            </div>
            <div class="bg-white rounded-2xl w-80 h-[200px] mx-6 shrink-0 p-6">
                material 06
            </div>
        </div>
    </div>


    </>
  );
}


function InputformKen(){
  const [text, setText] = useState("");
  return(
    <>
          {/* STORIES INPUT TEXT CONTAINER */}
          <div class="z-30 uploadstories-container uploadstories-textField bg-white shadow-3xl rounded-2xl col-start-1 row-start-3 row-span-4 p-5 mx-6 h-[440px]">
          <form>
            {/* STORY TEXT BODY */}
            <div class="flex">
              <div class="flex-col w-40 text-xs font-monospace mr-5">
                <label class="block pb-12">
                  Please write in the perspective of Jonas
                </label>
                <label class="block pb-12">
                  What did I see, hear, feel and smell?
                </label>
                <label class="block pb-12">What did I sense?</label>
              </div>
              <textarea
                required
                value={text}
                onChange={(e) => setText(e.target.value)}
                class="rounded-2xl p-2 h-[320px] w-full resize-none "
              ></textarea>
            </div>
            {/* AUTHOR NAME */}
            <div class="flex">
              <label class="w-40 text-xs font-monospace mr-5">Your Name?</label>
              <input class="rounded-2xl w-full p-2" type="text" required></input>
            </div>
            {/* EMAIL ADDRESS */}
            <div class="flex">
              <label class="w-40 text-xs font-monospace">Your Email?</label>
              <input class="rounded-2xl w-full p-2 mr-4" type="text" required></input>
              <button class="w-40 ml-2 px-2 py-2 border-black border-solid border-2 rounded-xl"> 
                  <p>Skip &#10142;</p> 
              </button>
            </div>
  
          </form>
        </div>
    </>
  )
}