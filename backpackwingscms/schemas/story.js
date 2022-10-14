export default {
    name: 'story',
    title: 'Story',
    type: 'document',
    fields: [
      {
        name: 'name',
        title: 'Name',
        type: 'string',
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
        name: 'publishedAt',
        title: 'Published at',
        type: 'datetime',
        readOnly: true,
      },
    ],
  
    preview: {
      select: {
        title: 'name',
      },
      prepare(selection) {
        const {name} = selection
        return Object.assign({}, selection, {
          subtitle: name && `by ${name}`,
        })
      },
    },
  }
  