import { faCheck, faCloud, faCode } from "@fortawesome/free-solid-svg-icons";

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { SectionHeader } from "./../sectionHeader";

export const Certifications = (props) => {
  const { certifications, pdf = false } = props;

  const renderCertificate = (certificate) => {
    return (
      <li key={certificate.title} className="my-xxs">
        <div className="row mt-md-0 mt-xxxs no-paragraph-margins">
          <div className="col-lg-2 col-sm-1">
            <span className={classNames("fa-layers fa-lg", "layer")}>
              <FontAwesomeIcon icon={faCircle} color="#4679bd" />
              <FontAwesomeIcon
                color="white"
                icon={certificate.icon_name === "cloud" ? faCloud : faCode}
                transform="shrink-8"
              />
            </span>
          </div>
          <div className="col">{certificate.title}</div>
        </div>
      </li>
    );
  };

  return (
    <article className="mt-xs">
      {pdf && <SectionHeader text="Certifications" dark />}
      {!pdf && <SectionHeader icon={faCheck} text="Certifications" />}
      <ul className="list-unstyled">
        {certifications && certifications.map(renderCertificate)}
      </ul>
    </article>
  );
};

export default Certifications;
