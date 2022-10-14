// # dev mode
// ## start dev mode
// netlify functions:serve
// invoke function in terminal
// netlify functions:invoke scheduled-api-function --port 9999
// invoke function in browser http://localhost:9999/.netlify/functions/add-story-to-cms

// const bodyParser = require('body-parser')
const sanityClient = require('@sanity/client')
const client = sanityClient({
    projectId: process.env.REACT_APP_SANITY_DATABASE_PROJECT_ID,
    dataset: process.env.REACT_APP_SANITY_MAIN_DATABASE_NAME,
    token: process.env.REACT_APP_SANITY_WRITE_SERVERSIDE
})


// function paramsToObject(entries) {
//   const result = {}
//   for(const [key, value] of entries) { // each 'entry' is a [key, value] tupple
//     result[key] = value;
//   }
//   return result;
// }

exports.handler = async (event, context, callback) => {
  // create timestamp
  // var today = new Date();
  // var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
  // var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  // var dateTime = date+' '+time;

  
  const urlParams = new URLSearchParams(event.body); // event.body -> 'abc=foo&def=%5Basf%5D&xyz=5'
  // const entries = urlParams.entries(); //returns an iterator of decoded [key,value] tuples
  // const params = paramsToObject(entries); //{abc:"foo",def:"[asf]",xyz:"5"}
  const params = Object.fromEntries(urlParams); // {abc: "foo", def: "[asf]", xyz: "5"}

  console.log("event.body: " + event.body )
  console.log("event.body params: " + JSON.stringify(params) )
  

  // Pulling out the payload from the body
  const { payload } = params
  // const { payload } = JSON.parse(params)
  //   const { payload } = JSON.parse(JSON.stringify(event.body))
  //   const { payload } = event.body
  console.log("Payload: " + JSON.stringify(payload) )

  // Checking which form has been submitted
  const isStoryForm = payload.data.formId === "story-form"

  // Build the document JSON and submit it to SANITY
  if (isStoryForm) {
    const storyData = {
      _type: "story",
      name: payload.data.name,
      email: payload.data.email,
      message: payload.data.message,
    //   publishedAt: dateTime,
    }

    const result = await client.create(storyData).catch((err) => console.log(err))
  }

  callback(null, {
    statusCode: 200,
  })
}

// exports.handler = async (event, context, callback) => {
//     try {
//         // write data to sanity database:
//         const newWeatherDataset = {
//           _type: 'weatherData',
//           timestamp: dateTime,
//         }

//         // const { payload } = JSON.parse(event.body)
//         const result = await client.create(newWeatherDataset).then((res) => {
//           // you can see this in the Netlify function logs
//           console.log('RESULT FROM SANITY: ', res)
//         })
//         callback(null, {
//           statusCode: 200
//         })

//       return { statusCode: 200, 
//         body: JSON.stringify({ data }) 
//     };
//     } catch (error) {
//       console.log(error);
//       return {
//         statusCode: 500,
//         body: JSON.stringify({ error: 'Failed fetching data' }),
//       };
//     }
// };