import React from "react";
import { SectionHeader } from "./../sectionHeader";
import PortableText from "../portableText";
import { FaDiceD20 } from "react-icons/fa";

export const HobbiesAndInterests = (props) => {
  const { personalInformation, pdf = false } = props;

  return (
    <article>
      <SectionHeader icon={FaDiceD20} text="Hobbies & Interests" dark={!pdf} />

      <PortableText blocks={personalInformation._rawHobbiesAndInterests} />
    </article>
  );
};

export default HobbiesAndInterests;
