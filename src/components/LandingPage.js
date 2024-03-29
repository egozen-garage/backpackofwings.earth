import React, { useState } from "react";
import backpack from "../img/backpack3.gif";
import { MouseSleeper } from "./mouseSleeper";

export function LandingPage(props) {
  const [buttonPopup, setButtonPopup] = useState(true);

  function HideLandingPage() {
    // setButtonPopup((prevState) => !prevState);
    setButtonPopup(false);
  }

  // boolean true or false statement
  return (
    <>

      {/* { buttonPopup ? "" :  } */}
      <MouseSleeper onBoarding={buttonPopup}/>


      {/* INTRO WINDOW */}

      { !buttonPopup ? "" :
      <>
      <div
        className="fixed z-99 flex flex-col w-[20rem] tablet:w-[30rem] laptop:w-[40rem] wideScreen:w-[60rem] h-[70vh] laptop:h-[60vh] wideScreen:h-[50vh] bg-white shadow-3xl border-solid rounded-[2rem] top-1/7 wideScreen:top-1/5 tablet:-ml-[15rem] left-1/2 -ml-[10rem] laptop:-ml-[20rem] wideScreen:-ml-[30rem]"
      >
        <div className="noScrollBar gradientLandingPageOverlay w-auto wideScreen:w-[46rem] overflow-y-scroll pt-8 pb-40 px-8 rounded-[2rem]">
          <h1 className="font-serif flex-1 leading-6 tablet:leading-[2rem] laptop:leading-8 text-2xl tablet:text-3xl wideScreen:leading-[2.8rem] wideScreen:text-[3rem]">
            Hello I'm Jonas. <br /> Welcome to my Backpack. <br /> Here you can
            access an app that tracks and provides information about my memories
            of migration. Some are lost, some remain. It would be great if you
            could retrieve my memories. <span className="mobileHorizontal:hidden">Please use the tablet or laptop for a full experience.</span>
          </h1>
          <p className="font-mono flex-2 leading-[13px] tablet:leading-4 laptop:leading-5 wideScreen:leading-7 text-xs tablet:text-sm laptop:text-lg wideScreen:text-2xl pt-6 wideScreen:pt-10">
            By connecting, you allow yourself to synchronise, follow and retrace
            the experience of a real bird...
          </p>

        </div>

        <img
          className="absolute bottom-4 wideScreen:bottom-8 left-10 wideScreen:left-14 w-32 h-auto pt-5 -ml-12"
          src={backpack}
          alt="backpack"
        />
        <button
          className="absolute bottom-6 wideScreen:bottom-10 right-6 wideScreen:right-10"
          onClick={() => HideLandingPage()}
        >
          <p className="button font-serif text-xl wideScreen:text-2xl">
            Connect &#8594;
          </p>
        </button>
      </div>
      {/* BACKGROUND */}
      <div className="gradientBackground"></div>
      </>
      }
    </>
  );
}
