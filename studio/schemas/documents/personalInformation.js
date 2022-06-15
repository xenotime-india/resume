import { GrInfo } from "react-icons/gr";
export default {
  name: "personalInformation",
  type: "document",
  title: "Personal Information",
  icon: GrInfo,
  __experimental_actions: ["update", /* 'create', 'delete', */ "publish"],
  fields: [
    {
      name: "fullName",
      type: "string",
      title: "Full Name",
    },
    {
      name: "jobTitle",
      type: "string",
      title: "Job Title",
    },
    {
      name: "location",
      type: "string",
      title: "Location",
    },
    {
      name: "phoneNumber",
      type: "string",
      title: "Phone No",
    },
    {
      name: "email",
      type: "string",
      title: "Email",
    },
    {
      name: "twitterUserName",
      type: "string",
      title: "Twitter User Name",
    },
    {
      name: "abountMeDescription",
      type: "portableText",
      title: "Abount Me Description",
    },
    {
      name: "hobbiesAndInterests",
      type: "portableText",
      title: "Hobbies And Interests",
    },
    {
      name: "image",
      type: "mainImage",
      title: "profile Image",
    },
    {
      name: "links",
      title: "Links",
      type: "array",
      of: [
        {
          type: "linkReference",
        },
      ],
    },
  ],
};
