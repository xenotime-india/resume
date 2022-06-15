import { FaUniversity } from "react-icons/fa";
export default {
  name: "education",
  type: "document",
  title: "Education",
  icon: FaUniversity,
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
      name: "organization",
      type: "string",
      title: "Organization",
    },
    {
      name: "year",
      type: "number",
      title: "year",
    },
    {
      name: "description",
      type: "portableText",
      title: "Description",
    },
  ],
};
