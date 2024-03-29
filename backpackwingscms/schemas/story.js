import { BsFileText } from 'react-icons/bs'

export default {
  name: "story",
  title: "Story",
  type: "document",
  icon: BsFileText,
  fields: [
    {
      name: "landmark",
      title: "Landmark",
      type: "string",
    },
    {
      name: "name",
      title: "Name",
      type: "string",
    },
    {
      name: "email",
      title: "Email",
      type: "string",
    },
    {
      name: "message",
      title: "Message",
      type: "text",
    },
    {
      name: "publishedAt",
      title: "Published at",
      type: "datetime",
      readOnly: true,
    },
  ],

  preview: {
    select: {
      title: "name",
      subtitle: "location",
    },
  },
};
