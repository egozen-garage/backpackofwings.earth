import { BsFillPinMapFill } from 'react-icons/bs'
import { AiFillFileImage } from 'react-icons/ai'

export default {
  name: "landmark",
  title: "Landmarks",
  type: "document",
  icon: BsFillPinMapFill,
  fields: [
    {
      name: "country",
      title: "Country",
      type: "string",
    },
    {
      name: "url",
      title: "URL Endpoint",
      type: "slug",
    },
    {
      name: "locationName",
      title: "Location Name",
      type: "string",
    },
    {
      name: "locationType",
      title: "Location Type",
      type: "string",
    },
    {
      name: "material",
      title: "Upload Materials",
      type: "array",
      of: [
        { type: "image",
          icon: AiFillFileImage, },
        { type: "imageURL"},
        { type: 'youtube'},
        { type: 'twitter'},
        { type: 'googleReviews'},
        { type: 'googleMaps'},
      ],
    },
  ],
  preview: {
    select: {
      title: "locationType",
      subtitle: "country",
    }
  }
}; 