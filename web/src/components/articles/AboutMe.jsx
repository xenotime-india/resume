import React from "react";
import PortableText from "../portableText";
import { SectionHeader } from "./../sectionHeader";
import { FaUser } from "react-icons/fa";

export const AboutMe = (props) => {
  const { personalInformation, pdf } = props;
  return (
    <article>
      {!pdf && <SectionHeader icon={FaUser} text="About Me" />}

      <PortableText blocks={personalInformation._rawAbountMeDescription} />
    </article>
  );
};

export default AboutMe;
