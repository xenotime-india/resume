import { AiOutlineLink } from "react-icons/ai";
export default {
  name: "link",
  type: "document",
  title: "Link",
  icon: AiOutlineLink,
  fields: [
    {
      name: "sequence",
      type: "number",
      title: "Sequence",
    },
    {
      name: "title",
      type: "string",
      title: "Title",
    },
    {
      name: "href",
      type: "url",
      title: "Href",
    },
    {
      name: "iconName",
      type: "string",
      title: "Icon Name",
    },
  ],
};
