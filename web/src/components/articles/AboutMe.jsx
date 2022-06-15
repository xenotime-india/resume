import { faUser } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import PortableText from "../portableText";
import { SectionHeader } from "./../sectionHeader";

export const AboutMe = (props) => {
  const { personalInformation, pdf } = props;
  return (
    <article>
      {!pdf && <SectionHeader icon={faUser} text="About Me" />}

      <PortableText blocks={personalInformation._rawAbountMeDescription} />
    </article>
  );
};

export default AboutMe;
