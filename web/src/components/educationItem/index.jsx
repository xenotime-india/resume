import React from "react";
import PortableText from "../portableText";
import { FaUniversity } from "react-icons/fa";

export const EducationItem = (props) => {
  const {
    year,
    sequence,
    title,
    organization,
    _rawDescription,
    pdf = false,
  } = props;

  return (
    <article className={pdf ? "mt-xxs" : "mt-xs"}>
      <h4 className="d-inline-block">{title}</h4>
      <div>
        <FaUniversity className="me-xxxs" style={{ marginBottom: "5px" }} />
        {organization}
      </div>
      <div className={pdf ? "mt-xxxs" : "mt-xxs"}>
        <PortableText blocks={_rawDescription} />
      </div>
    </article>
  );
};

export default EducationItem;
