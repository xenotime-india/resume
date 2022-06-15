import {
  faIdCard,
  faCircle,
  faMobile,
  faMapMarker,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import classNames from "classnames";
import { SectionHeader } from "./../sectionHeader";

export const ContactInformation = (props) => {
  const { personalInformation, privateInformation, pdf = false, links } = props;

  return (
    <article className="contact-information">
      {!pdf && <SectionHeader icon={faIdCard} text="Contact Information" />}
      <ul className="list-unstyled">
        <li>
          <div className="row mt-md-0 my-xxxs">
            <div className="col-lg-3 col-sm-1">
              {pdf && (
                <span className={classNames("fa-layers fa-lg")}>
                  <FontAwesomeIcon icon={faCircle} color="#4679bd" />
                  <FontAwesomeIcon
                    color="white"
                    icon={faEnvelope}
                    transform="shrink-8"
                  />
                </span>
              )}

              {!pdf && <strong>Email:</strong>}
            </div>
            <div className="col">
              <a
                href={`mailto:${personalInformation.email}`}
                target="_blank"
                rel="noreferrer"
              >
                {personalInformation.email}
              </a>
            </div>
          </div>
        </li>
        <li>
          <div className="row mt-md-0 my-xxxs">
            <div className="col-lg-3 col-sm-1">
              {pdf && (
                <span className={classNames("fa-layers fa-lg")}>
                  <FontAwesomeIcon icon={faCircle} color="#4679bd" />
                  <FontAwesomeIcon
                    color="white"
                    icon={faMapMarker}
                    transform="shrink-8"
                  />
                </span>
              )}

              {!pdf && <strong>Location:</strong>}
            </div>
            <div className="col">
              <a
                href={`http://maps.google.com/?q=${personalInformation.location}`}
                target="_blank"
                rel="noreferrer"
              >
                {personalInformation.location}
              </a>
            </div>
          </div>
        </li>
        <li>
          <div className="row mt-md-0 mt-xxxs">
            <div className="col-lg-3 col-sm-1">
              {pdf && (
                <span className={classNames("fa-layers fa-lg")}>
                  <FontAwesomeIcon icon={faCircle} color="#4679bd" />
                  <FontAwesomeIcon
                    color="white"
                    icon={faMobile}
                    transform="shrink-8"
                  />
                </span>
              )}

              {!pdf && <strong>Mobile No:</strong>}
            </div>
            <div className="col">
              <a
                href={`tel:${personalInformation.phoneNumber}`}
                target="_blank"
                rel="noreferrer"
              >
                {personalInformation.phoneNumber}
              </a>
            </div>
          </div>
        </li>
        {pdf &&
          links &&
          links.map((link) => (
            <li key={link.title}>
              <div className="row mt-md-0 mt-xxxs no-paragraph-margins">
                <div className="col-lg-2 col-sm-1">
                  <span className={classNames("fa-layers fa-lg")}>
                    <FontAwesomeIcon icon={faCircle} color="#4679bd" />
                    <FontAwesomeIcon
                      color="white"
                      icon={["fab", link.iconName]}
                      transform="shrink-8"
                    />
                  </span>
                </div>
                <div className="col">
                  <a href={link.href} target="_blank" rel="noreferrer">
                    {link.title}
                  </a>
                </div>
              </div>
            </li>
          ))}
      </ul>
    </article>
  );
};

export default ContactInformation;
