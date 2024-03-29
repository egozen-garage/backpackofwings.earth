import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import "../css/animation.css";
import "../css/gradientAnimation.css";
import StoryInputFormSubmited from './StoryInputFormSubmited'

import { useEffect, useState } from "react";


export default function StoryInputForm(props){
  const { landmark } = useParams()
  const [formReady, setFormReady] = useState(false)
  const [newStoryId, setNewStoryId] = useState(null)
  // const [formSubmited, setFormSubmited] = useState(null)

  // Initiate forms
  // const { register, handleSubmit, errors, reset } = useForm()
  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
    reset,
  } = useForm();
  // const { register, handleSubmit, watch, formState: { errors } } = useForm();


  const [newLandmarkRegistered, setNewLandmarkRegistered] = useState(false)
  useEffect(() => {
    setNewLandmarkRegistered(true)
  }, [landmark])
  if(newLandmarkRegistered){
    reset()
    setNewLandmarkRegistered(false)
  }

  // Transforms the form data from the React Hook Form output to a format Netlify can read
  const encode = (data) => {
    return Object.keys(data)
      .map(
        (key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key])
      )
      .join("&");
  };

  // Handles the post process to Netlify so we can access their serverless functions
  const handlePost = (formData, event) => {
    fetch(`/.netlify/functions/add-story-to-cms`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({ "form-name": "story-form", ...formData }),
    })
    .then(response => response.json())
    .then(json => {
      reset();
      const returnedStoryId = json.storyId
      setNewStoryId(returnedStoryId)
    })
    .catch((error) => {
      console.log(error);
    });

    setFormSubmited(true)
    setFormReady(false) 
    setStory(null)
    setAuthor(null)
    setMail(null)
    event.preventDefault();
  };

  const [formSubmited, setFormSubmited] = useState(false)
  const [story, setStory] = useState(null)
  const [author, setAuthor] = useState(null)
  const [mail, setMail] = useState(null)
  

  function isValidEmail() {
    return /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(mail);
  }

  function checkForm(){
    setFormSubmited(false)
    trigger()
    if(story && author && isValidEmail()){ 
      return setFormReady(true) 
    } 
  }

  const [storyTitle, setStoryTitle] = useState(null)
  const landmarkdata = props.landmarkData
  useEffect(() => {
    for(const x in landmarkdata){
      if(landmark === landmarkdata[x].url.current){
        const locationType = landmarkdata[x].locationType
        const locationName = landmarkdata[x].locationName
        setStoryTitle(locationType + ", " + locationName)
      }
    }
  }, [landmark, landmarkdata])

  const mobileThreshold = 640
  const [hideForm, setHideForm] = useState(null)
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)
  useEffect(() => {
    window.addEventListener("resize", () => {
      setWindowWidth(window.innerWidth)
      console.log("window width: " +window.innerWidth)
      if(window.innerWidth < mobileThreshold){
        setHideForm(true)
      } else {
        setHideForm(false)
      }
    })
    if(window.innerWidth < mobileThreshold){
      setHideForm(true)
    }

  }, [])

  const containerStyle = "sm:relative fixed sm:z-58 z-30 sm:bg-inherit  uploadstories-container uploadstories-textField overflow-scroll noScrollBar h-full sm:pt-0 pt-20 sm:pl-4 xs:pl-14 pl-9 sm:pr-12 xs:pr-14 pr-9 sm:mx-6 sm-0 top-0 bottom-0 right-0 left-0  "

  const backgroundGradient = windowWidth <= mobileThreshold ? " gradientUploadStory " : ""
  // const hidden = windowWidth >= mobileThreshold ? " hidden " : ""

  // const buttonStyleWriteStory = "sm:collapse fixed visible  bottom-10 w-full  sm:hidden block place-content-center"
  const buttonStyleWriteStory = "flex sm:flex-nowrap flex-wrap w-full mt-10 "


  // fixed h-full z-60 pt-30 flex top-0 bottom-0 right-0 left-0
  return (
      <>
        <StoryInputFormSubmited newStoryId={newStoryId} landmark={landmark} formSubmited={formSubmited} />
        
        {/* <div className="z-30 uploadstories-container uploadstories-textField overflow-scroll noScrollBar h-full pl-4 pr-12 mx-6 ">
          <form */}

        <div className={buttonStyleWriteStory}>
          {/* <button onClick={() => setHideForm(false)} className="button text-sm w-auto float-center">Write a story</button> */}
          <button onClick={() => setHideForm(false)} className="button text-sm font-serif mb-6 w-full sm:hidden block">Write a story</button>
        </div>


    { hideForm ? "" : 
      <div className={[containerStyle, backgroundGradient]}>
        <form
            onSubmit={handleSubmit(handlePost)}
            name="story-form"
            method="POST"
            action="/success/"
            data-netlify="true"
            netlify-honeypot="got-ya"
            className="flex flex-col h-full pb-6"
          >
            {/* STORY ID hidden input field */}
            <input type="hidden" name="form-name" value="story-form" />
            <input
              type="hidden"
              name="formId"
              value="story-form"
              // ref={register()}
              {...register("formID", {})}
            />

            {/* STORY Landmar hidden input field */}
            <input type="hidden" name="landmark-name" value={props.currentLandmark} />
            <input
                type="hidden"
                name="landmarkName"
                value={props.currentLandmark}
                // ref={register()}
                {...register('landmarkName', {})}
            />

            {/* STORY TEXT BODY */}
            <div className="flex pb-2 h-full sm:flex-nowrap flex-wrap items-stretch ">
              <div className="flex-col sm:w-48 w-full wideScreen:w-[15rem] text-2xs wideScreen:text-xs font-mono font-bold mt-2 mr-2 h-20 ">

                <label htmlFor="message" className="block sm:pb-12 pb-2">
                  Please write in the perspective of Jonas
                  {errors.message && <span style={{ color: "red" }}> *</span>}
                </label>
                <label className="block sm:pb-12 pb-2">
                  What did I see, hear, feel and smell?
                </label>
                <label className="block sm:pb-5 pb-2">What did I sense?</label>
              </div>
              <textarea
                onInput={e => setStory(e.target.value)}
                title="What did I sense?"
                rows="4"
                name="message"
                className="bg-transparent shadow-innerText font-sans rounded-2xl p-2 h-auto w-full h-full resize-none "
                required
                {...register("message", { required: true })}
              />
            </div>

            {/* STORY AUTHOR NAME */}
            <div className="flex pb-2 mt-auto sm:flex-nowrap flex-wrap">
              <label htmlFor="name" className="w-48 wideScreen:w-[15rem] text-2xs wideScreen:text-xs font-mono font-bold mt-3 mr-2">
                Write your name
                {errors.name && <span style={{ color: "red" }}> *</span>}
              </label>
              <input
                onInput={e => setAuthor(e.target.value)}
                name="name"
                className="bg-transparent shadow-innerText font-sans rounded-2xl w-full p-2"
                required
                {...register("name", { required: true })}
              />
            </div>

            {/* STORY EMAIL ADDRESS */}
            <div className="flex sm:flex-nowrap flex-wrap">
              <label htmlFor="email" className="w-48 wideScreen:w-[15rem] text-2xs wideScreen:text-xs font-mono font-bold mt-3 mr-2">
                Write your E-Mail
                {errors.email && <span style={{ color: "red" }}> *</span>}
              </label>
              <input
                ref="mailRef"
                onInput={e => setMail(e.target.value)}
                name="email"
                className="bg-transparent shadow-innerText font-sans rounded-2xl w-full p-2"
                required
                {...register("email", {
                  required: true,
                  pattern:
                    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
                })}
              />
              <label
                htmlFor="got-ya"
                style={{
                  position: "absolute",
                  overflow: "hidden",
                  clip: "rect(0 0 0 0)",
                  height: "1px",
                  width: "1px",
                  margin: "-1px",
                  padding: "0",
                  border: "0",
                }}
              >
                Don’t fill this out if you're human:
                {/* <input tabIndex="-1" name="got-ya" ref={register()} /> */}
                <input tabIndex="-1" name="got-ya" {...register("got-ya", {})} />
              </label>
            </div>

            {/* SUBMIT BUTTON */}
            {/* <button type="submit" className="pt-7 ml-auto">
              <p className="button font-serif font-bold border-black border-solid border-[1px] rounded-[2rem] py-1 px-4">Finalise &#8594;</p>
            </button> */}
            <button type="button" onClick={checkForm} className="my-2 pb-0 wideScreen:pt-16 wideScreen:pb-10 ml-auto">
              <p className="button text-m wideScreen:text-2xl font-serif border-black border-solid border-[1px] rounded-[2rem] py-2 px-5">Finalise &#8594;</p>
            </button>
            <button  onClick={() => setHideForm(true)}className="button text-sm font-serif mb-6 sm:hidden block">back</button>
          {/* </form>
        </div> */}

        { !formReady ? "" : 
          <div className={
            formSubmited ? 
            "opacity-fade-out slide-left-to-right fixed h-full z-59 pt-30 flex top-0 bottom-0 right-0 left-0 items-center justify-center" : 
            "opacity-fade-in slide-right-to-left fixed h-full z-59 pt-30 flex top-0 bottom-0 right-0 left-0 items-center justify-center" }
          >
            <div onClick={() => setFormReady(false)}  className="fixed bg-black opacity-10 top-0 bottom-0 right-0 left-0"></div>

            
            <div className=" fixed flex flex-col drop-shadow-lg mx-20 max-w-screen-sm w-full bg-white h-4/5 w-4/5 rounded-3xl p-8">
              <h1 className="upload-form-title bg-white font-bold text-lg mb-6">{storyTitle}</h1>
              <div className="noScrollBar font-sans text-base wideScreen:text-xl wideScreen:leading-8 overflow-y-scroll h-auto">
                <p className=""> 
                  {story}
                </p>
                <p className="mt-5">{author}</p>
                <p className="mt-5 mb-40">{mail}</p>
              </div>
              <div className="mt-auto h-auto left-0 right-0 w-full" >
                <label className="flex mt-5 pb-3">
                  <input required type="checkbox" className="w-5 h-5 rounded-none outline-black"/> <span class="checkmark pl-5">I hereby allow to share my story in the website section Load Memories</span>
                </label>
                <div className="right-10 mr-0 ml-auto float-right" >
                  <button type="button" onClick={() => setFormReady(false)} className="mr-0">
                    <p className="button font-serif font-bold border-black border-solid border-[1px] rounded-[2rem] py-1 px-4">Edit</p>
                  </button>
                  <button type="submit" className=" ">
                    <p className="button font-serif font-bold">Submit &#8594;</p>
                  </button>
                </div>
              </div>
            </div>  

          </div>
        }
        </form>
      </div>
    }

      </>
  );
}
