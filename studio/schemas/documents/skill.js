import { GiSkills } from "react-icons/gi";
export default {
  name: "skill",
  type: "document",
  title: "Skill",
  icon: GiSkills,
  fields: [
    {
      name: "sequence",
      type: "number",
      title: "Sequence",
    },
    {
      name: "levelName",
      type: "string",
      title: "Level Name",
      options: {
        list: [
          { title: "COMFORTABLE", value: "COMFORTABLE" },
          { title: "FAMILIAR", value: "FAMILIAR" },
          { title: "PROFICIENT", value: "PROFICIENT" },
        ],
      },
    },
    {
      name: "level",
      type: "number",
      title: "Level",
    },
    {
      name: "skills",
      title: "Skills",
      type: "tags",
    },
  ],
};
