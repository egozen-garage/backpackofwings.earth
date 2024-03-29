import {BsTwitter} from 'react-icons/bs'

export default {
    name: 'twitter',
    type: 'object',
    title: 'Twitter Embed',
    icon: BsTwitter,
    fields: [
        {
            name: "tweetTitle",
            type: "string",
            title: "Tweed Title",
        },
        {
            name: "channel",
            type: "string",
            title: "Twitter Channel",
        },
        // {
        //     name: "tweetURL",
        //     type: "url",
        //     title: "Full Twitter Link",
        // },
        {
            name: "tweetEmbed",
            type: "string",
            title: "Embed Tweet HTML",
        },
        // {
        //     name: 'id',
        //     type: 'string',
        //     title: 'Tweed ID'
        // },
    ],
    preview: {
        select: {
          url: "url",
          title: "tweetTitle",
          subtitle: "channel",
        },
      },
};