import React from "react";
import { SectionHeader } from "./../sectionHeader";
import * as FontAwesome from "react-icons/fa";
import {
  FaCircle,
  FaEnvelope,
  FaMapMarker,
  FaMobile,
  FaIdCard,
} from "react-icons/fa";

export const ContactInformation = (props) => {
  const { personalInformation, pdf = false } = props;
  const { links } = personalInformation;

  const linkRender = ({ link }) => {
    const FaIcon = FontAwesome[link.iconName];
    return (
      <li key={link.title}>
        <div className="row mt-md-0 mt-xxxs no-paragraph-margins">
          <div className="col-lg-2 col-sm-1">
            <span className="fa-stack small">
              <FaCircle color="#4679bd" className="fa-stack-2x" size={21} />
              <FaIcon color="#ffffff" size={10} className="fa-stack-1x" />
            </span>
          </div>
          <div className="col">
            <a href={link.href} target="_blank" rel="noreferrer">
              {link.title}
            </a>
          </div>
        </div>
      </li>
    );
  };

  return (
    <article className="contact-information">
      {!pdf && <SectionHeader icon={FaIdCard} text="Contact Information" />}
      <ul className="list-unstyled">
        <li>
          <div className="row mt-md-0 mt-xxxs no-paragraph-margins">
            <div className="col-lg-3 col-sm-1">
              {pdf && (
                <span className="fa-stack small">
                  <FaCircle color="#4679bd" className="fa-stack-2x" size={21} />
                  <FaEnvelope
                    color="#ffffff"
                    size={10}
                    className="fa-stack-1x"
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
          <div className="row mt-md-0 mt-xxxs no-paragraph-margins">
            <div className="col-lg-3 col-sm-1">
              {pdf && (
                <span className="fa-stack small">
                  <FaCircle color="#4679bd" className="fa-stack-2x" size={21} />
                  <FaMapMarker
                    color="#ffffff"
                    size={10}
                    className="fa-stack-1x"
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
          <div className="row mt-md-0 mt-xxxs no-paragraph-margins">
            <div className="col-lg-3 col-sm-1">
              {pdf && (
                <span className="fa-stack small">
                  <FaCircle color="#4679bd" className="fa-stack-2x" size={21} />
                  <FaMobile color="#ffffff" size={10} className="fa-stack-1x" />
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
        {pdf && links && links.map(linkRender)}
      </ul>
    </article>
  );
};

export default ContactInformation;
