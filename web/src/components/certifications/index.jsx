import * as FontAwesome from "react-icons/fa";
import React from "react";
import { SectionHeader } from "./../sectionHeader";
import { FaCheck, FaCircle } from "react-icons/fa";

export const Certifications = (props) => {
  const { certifications, pdf = false } = props;

  const renderCertificate = (certificate) => {
    const FaIcon = FontAwesome[certificate.iconName];
    return (
      <li key={certificate.title} className="my-xxs">
        <div className="row mt-md-0 mt-xxxs no-paragraph-margins">
          <div className="col-lg-2 col-sm-1">
            <span className="fa-stack small">
              <FaCircle color="#4679bd" className="fa-stack-2x" size={21} />
              <FaIcon color="#ffffff" size={10} className="fa-stack-1x" />
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
      {!pdf && <SectionHeader icon={FaCheck} text="Certifications" />}
      <ul className="list-unstyled">
        {certifications && certifications.map(renderCertificate)}
      </ul>
    </article>
  );
};

export default Certifications;
