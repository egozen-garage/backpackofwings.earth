// First, we must import the schema creator
import createSchema from 'part:@sanity/base/schema-creator'

// Then import schema types from any plugins that might expose them
import schemaTypes from 'all:part:@sanity/base/schema-type'

// We import object and document schemas
import blockContent from './blockContent'
import landmark from './landmark'
import story from './story'
import youtube from './youtube'
import twitter from './twitter'
import imageURL from './imageURL'
// import googleReviews from './googleReviews'
import googleMaps from './googleMaps'
import movebankDaily from './movebankDaily'
import movebankSingleLocation from './movebankSingleLocation'
import facebook from './facebook'
import tiktok from './tiktok'
import weather from './weather'
import weatherObject from './weatherObject'

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  // We name our schema
  name: 'default',
  // Then proceed to concatenate our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([
    // The following are document types which will appear
    // in the studio.
    landmark,
    story,
    youtube,
    twitter,
    facebook,
    tiktok,
    imageURL,
    // googleReviews,
    googleMaps,
    movebankDaily,
    movebankSingleLocation,
    weather,
    weatherObject,
    // When added to this list, object types can be used as
    // { type: 'typename' } in other document schemas
    blockContent,
  ]),
})
