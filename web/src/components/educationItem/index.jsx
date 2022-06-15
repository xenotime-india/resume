import { faUniversity } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import PortableText from "../portableText";

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
        <FontAwesomeIcon className="me-xxxs" icon={faUniversity} />
        {organization}
      </div>
      <div className={pdf ? "mt-xxxs" : "mt-xxs"}>
        <PortableText blocks={_rawDescription} />
      </div>
    </article>
  );
};

export default EducationItem;
