export default {
  name: "linkReference",
  type: "object",
  title: "Link reference",
  fields: [
    {
      name: "link",
      type: "reference",
      to: [
        {
          type: "link",
        },
      ],
    },
  ],
  preview: {
    select: {
      title: "link.title",
    },
  },
};
