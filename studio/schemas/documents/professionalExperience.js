import { AiTwotoneExperiment } from "react-icons/ai";
export default {
  name: "professionalExperience",
  type: "document",
  title: "Professional Experience",
  icon: AiTwotoneExperiment,
  fields: [
    {
      name: "position",
      type: "string",
      title: "Position",
    },
    {
      name: "organization",
      type: "string",
      title: "Organization",
    },
    {
      name: "isCurrent",
      type: "boolean",
      title: "Is Current",
    },
    {
      name: "description",
      type: "portableText",
      title: "Description",
    },
    {
      name: "startDate",
      type: "date",
      title: "Start Date",
    },
    {
      name: "endDate",
      type: "date",
      title: "End Date",
    },
  ],
};
