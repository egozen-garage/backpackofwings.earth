import { useState, useEffect, useRef } from "react";
import { useParams, useLocation, Outlet, useNavigate } from "react-router-dom";
import SanityClient from "../client";

import AudioPlayer from "../utilities/AudioPlayer";
// import Carousel from "../utilities/Carousel";

import "../css/animation.css";
import "../css/gradientAnimation.css";


export function StoriesData(props) {
  const { landmark, id } = useParams()
  const location = useLocation();
  const currentLandmark = location.pathname.split("/")[2];
  console.log("StoriesData > current Landmark:" + currentLandmark);

  const navigate = useNavigate()
  
  // const [currentIndex, setCurrentIndex] = useState(0);

  // let memoryContent = CallSanityAPI(`*[_id == "${id}"]`)

  const [storyIds, setStoryIds] = useState(null)
  const [firstId, setFirstId] = useState(false)
  // const [storyArray, setStoryArray] = useState(null)
  useEffect(() => {
    console.log("call Sanity to check amout of storys")
    Promise.all([
      SanityClient.fetch(
        `*[_type == "story" && landmark == "${landmark}"]{_id}`
      )
  ])
  .then(([sanityData]) => {
      setStoryIds(sanityData);
      setFirstId(true)
      setStoryCounter(1)
  })
  .catch((err) => {
  })
  }, [landmark])


  const [newStoryIds, setNewStoryIds] = useState(null)
  if(storyIds && firstId){
    setFirstId(false)
    console.log("amount of id entries: " + JSON.stringify(storyIds))
    var temNewStoryIds = storyIds.filter(function(record) {
      return record['_id'] !== id;
    });
    setNewStoryIds(temNewStoryIds)
    console.log("new amount of id entries: " + JSON.stringify(newStoryIds))
  }

  // let amountOfMemories = storyIds.length
  // let amountOfMemories = props.storyIds.length

  const [data, setData] = useState(null);
  // const [isLoaded, setIsLoaded] = useState(false);
  // const [error, setError] = useState(null);
  useEffect(()=>{
      Promise.all([
          SanityClient.fetch(
            `*[_id == "${id}"]`
            // `*[_type == "story" && landmark == ${currentLandmark}]`
          )
      ]) 
      .then(([sanityData]) => {
              console.log("call story data locally")
              setData(sanityData);
              // setStoryArray(sanityData);
              // setIsLoaded(true);
      })
      .catch((err) => {
          // setError(err)
      })
  },[id])
  // let memoryContent = null;


  console.log("memory Content: " + JSON.stringify(data) )
  // console.log("check storyArray:" + JSON.stringify(storyArray))

  // const [memoryId2URL, setMemoryId2URL] = useState(false);

  // let currentMemoryID = props.memoryIDs.data[0]._id
  // console.log("currentMemoryID " + currentMemoryID)
  // const memoryId2URL = props.memoryIDs[0]._id
  // useEffect(() => {

  //   navigate(memoryId2URL)
  // }, [memoryId2URL, navigate])
  // console.log("memory id: " + JSON.stringify(props.memoryIDs[0]._id))


  // const id = "tHeP5c0LRgwgppIjwZnMBZ"
  // let memoryContent = CallSanityAPI(`*[_type == "story" && _id == "${currentMemoryID}"]`)
  // console.log("memory content: " + JSON.stringify(memoryContent))  

  // const goToPrev = () => {
  //   const isFirstStory = currentIndex === 0;
  //   const newIndex = isFirstStory
  //     ? stories.stories.length - 1
  //     : currentIndex - 1;
  //   setCurrentIndex(newIndex);
  // };

  useEffect(() => {
    window.onpopstate = e => {
      navigate("/")
    };
  }, [navigate]);

  const [storyCounter, setStoryCounter] = useState(1)
  // console.log("storyArray, count storyCounter: " + storyCounter)

  const timeout = useRef()
  const timeUnitLoading = 500 
  const [loadingNewStory, setLoadingNewStory] = useState(false)
  // let procentage = 0
  // const increaseProcentage = () => {
    //   procentageInterval = setInterval(function() {
      //     console.log("interval")
      //     procentage += 1
      //   }, 10)
      
      //   if(procentage === 100) {
        //     // window.clearInterval(procentageInterval);
        //   }
        // }
        
        
  const [loadProcentage, setLoadProcentage] = useState(0)
  useEffect(() => {
    if(loadingNewStory === false) return
    let procentage = 0;
      const procentageInterval = setInterval(function() {
        // console.log("interval " + procentage)
        procentage += 1
        setLoadProcentage(procentage += 1)
      if(procentage === 100) {
        window.clearInterval(procentageInterval);
      }
      }, 5)
    }, [loadingNewStory])

    const animatedWidth = { width: loadProcentage+"%"}
    const loadingBar = (
      <div className=" p-8 z-60 grid grid-cols-1 transition-width ease-in duration-300">
          <div className="flex items-center order-2 bg-backpackDarkGray h-1 w-full mt-2">
                <div style={animatedWidth} className="bg-black h-full   "></div>
          </div>
      </div>
    )
    

  const [nrOfNextLandmark, setNrOfNextLandmark] = useState(null)
  useEffect(() => {
    let number =  landmark === "droemling" ? 1 : 
                  landmark === "lackova" ? 2 :
                  landmark === "istanbul" ? 3 :
                  landmark === "hama" ? 4 :
                  landmark === "neveeitan" ? 5 :
                  landmark === "dudaimsite" ? 0 : 0
    setNrOfNextLandmark(number)
    console.log("next Number: " + number)
  }, [landmark])

  const goToNext = () => {
    setLoadingNewStory(true)
    timeout.current = setTimeout(function(){
      setLoadingNewStory(false)
      // setLoadProcentage(0)
      console.log("timer is on")
    }, timeUnitLoading);
    setStoryCounter(storyIds.length === storyCounter ? 1 : storyCounter+1)
    if(storyIds.length === storyCounter){
      //random Landmark
      // let landmarkNumber =  landmark === "droemling" ? 0 : 
      //                         landmark === "lackova" ? 1 :
      //                         landmark === "istanbul" ? 2 :
      //                         landmark === "hama" ? 3 :
      //                         landmark === "neveeitan" ? 4 :
      //                         landmark === "dudaimsite" ? 5 : 0
      // const randomNumber = [{"landmark_id": 0}, {"landmark_id": 1}, {"landmark_id": 2}, {"landmark_id": 3}, {"landmark_id": 4}, {"landmark_id": 5}]      
      // var newRandomNumber = randomNumber.filter(function(record) {
      //   return record['landmark_id'] !== landmarkNumber;
      // });
      // let shuffledNumbers = newRandomNumber
      //   .map(value => ({ value, sort: Math.random() }))
      //   .sort((a, b) => a.sort - b.sort)
      //   .map(({ value }) => value)
      // const randomNumber2SelectNewLandmark = Math.floor(Math.random() * 4)
      // const newId = props.storyIds[shuffledNumbers[randomNumber2SelectNewLandmark].landmark_id].ids[0]._id
      // const newLandmark = props.storyIds[shuffledNumbers[randomNumber2SelectNewLandmark].landmark_id].ids[0].landmark
      // ordered Landmark
      const newId = props.storyIds[nrOfNextLandmark].ids[0]._id
      const newLandmark = props.storyIds[nrOfNextLandmark].ids[0].landmark
      const newUrlEndpoint = "/loadmemory/" + newLandmark + "/" + newId
      navigate(newUrlEndpoint)
      
      
      // generate new link with new landmark
      // const newUrlEndpoint = props.storyIds[shuffledNumbers[Math.floor(Math.random() * 4)].landmark_id]._id

    } else {
      // switch to next Story of same Landmark
      navigate("/loadmemory/" + landmark + "/" + newStoryIds[storyCounter-1]._id)
    }

    // const isLastStory = currentIndex === stories.stories.length - 1;
    // const newIndex = isLastStory ? 0 : currentIndex + 1;
    // setCurrentIndex(newIndex[storyCounter-1]);
    // navigate(newStoryIds[])
  };

  // const goToStory = (storyIndex) => {
  //   setCurrentIndex(storyIndex);
  // };

  const [storyTitle, setStoryTitle] = useState(null)
  const landmarkdata = props.landmarkData
  console.log("landmarkdata: " + JSON.stringify(landmarkdata[0]))
  useEffect(() => {
    for(const x in landmarkdata){
      if(landmark === landmarkdata[x].url.current){
        const locationType = landmarkdata[x].locationType
        const locationName = landmarkdata[x].locationName
        setStoryTitle(locationType + ", " + locationName)
      }
    }
  }, [landmark, landmarkdata])



  if(data && storyIds){
  return (
    <>
      <div className="storiesContainerAnimation fixed bottom-0 flex flex-col z-20 w-screen mobileHorizontal:w-[35rem] wideScreen:w-[60rem] pt-0 mobileHorizontal:pt-[7rem] wideScreen:pt-[10rem] pb-10 mobileHorizontal:pb-0 px-6 mobileHorizontal:px-16 wideScreen:px-20 h-[34rem] mobileHorizontal:h-screen">
        <div className="flex pb-10">
          <h1 className="flex-1 text-lg mobileHorizontal:text-xl wideScreen:text-2xl font-bold">
            {storyTitle}
          </h1>
          <h1 className="flex-2 text-lg mobileHorizontal:text-xl  wideScreen:text-2xl font-bold">{storyCounter}/{storyIds.length} Memories</h1>
        </div>

        {/* STORY TEXT */}
        <div className="noScrollBar gradientStoryOverlay font-sans text-[0.9rem] mobileHorizontal:text-base wideScreen:text-xl wideScreen:leading-8 overflow-y-scroll h-auto pb-32">
          {/* <Carousel storyData={data} storyCounter={storyCounter}/> */}
          {loadingNewStory ? loadingBar : data[0].message}
          {/* {loadingBar} */}
        </div>

        {/* NEXT BUTTON */}
        <div
          className="font-serif text-sm tablet:text-lg wideScreen:text-2xl z-50 w-full cursor-e-resize mt-auto pb-0 tablet:pb-5"
          onClick={goToNext}
        >
          <button className="button float-right">
          { storyCounter === storyIds.length ? "Next Location " : "Next "}&#8594;
          </button>
        </div>

        {/* SOUNDSCAPE PLAY WAVEFORM */}
        <AudioPlayer></AudioPlayer>
      </div>
      {/* <div className="px-3">
        {stories.stories.map((story, storyIndex) => (
          <div
            className="bg-white rounded-2xl w-3 h-3 m-6 cursor-pointer"
            key={storyIndex}
            onClick={() => goToStory(storyIndex)}
          >
            <p className="text-white px-5">Location{storyIndex}</p>
          </div>
        ))}
      </div> */}
      <Outlet />
    </>
  );
}
}

export default StoriesData;
