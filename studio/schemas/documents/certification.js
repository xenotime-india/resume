import { GrCertificate } from "react-icons/gr";
export default {
  name: "certification",
  type: "document",
  title: "Certification",
  icon: GrCertificate,
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
      name: "iconName",
      type: "string",
      title: "Icon Name",
    },
  ],
};
