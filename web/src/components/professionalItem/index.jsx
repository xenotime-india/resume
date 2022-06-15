import { faCalendar } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import classNames from "classnames";
import PortableText from "../portableText";

export const ProfessionalItem = (props) => {
  console.log(props);
  const {
    organization,
    isCurrent,
    position,
    endDate,
    startDate,
    _rawDescription,
    pdf = false,
  } = props;

  return (
    <article
      className={classNames(
        "professional-item",
        pdf ? "mt-xxs" : "mt-xs",
        "professionalItem",
      )}
    >
      <h5 className="designation">
        <span>{position}</span>
      </h5>
      <h6 className="organization">
        <span>{organization}</span>
      </h6>
      <div>
        <FontAwesomeIcon className="me-xxxs" icon={faCalendar} />
        {startDate}–{isCurrent ? "Current" : endDate}
      </div>
      <div className={pdf ? "mt-xxxs" : "mt-xxs"}>
        <PortableText blocks={_rawDescription} />
      </div>
    </article>
  );
};

export default ProfessionalItem;
