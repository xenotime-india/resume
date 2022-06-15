import { faDiceD20 } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { SectionHeader } from "./../sectionHeader";
import PortableText from "../portableText";

export const HobbiesAndInterests = (props) => {
  const { personalInformation, pdf = false } = props;

  return (
    <article>
      <SectionHeader icon={faDiceD20} text="Hobbies & Interests" dark={!pdf} />

      <PortableText blocks={personalInformation._rawHobbiesAndInterests} />
    </article>
  );
};

export default HobbiesAndInterests;
