import React from "react";
import classNames from "classnames";
import { FaRegCalendarAlt } from "react-icons/fa";

import PortableText from "../portableText";
import { formatDate } from "../../lib/helpers";

export const ProfessionalItem = (props) => {
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
        <FaRegCalendarAlt className="me-xxxs" style={{ marginBottom: "4px" }} />
        {formatDate(new Date(startDate))} –{" "}
        {isCurrent ? "Current" : endDate ? formatDate(new Date(endDate)) : null}
      </div>
      <div className={pdf ? "mt-xxxs" : "mt-xxs"}>
        <PortableText blocks={_rawDescription} />
      </div>
    </article>
  );
};

export default ProfessionalItem;
