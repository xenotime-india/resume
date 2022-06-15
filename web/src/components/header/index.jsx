import { faFilePdf } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classnames from "classnames";
import React from "react";
import SanityImage from "gatsby-plugin-sanity-image";

export const Header = (props) => {
  const { pdf = false, subtitle, title, profilePic = {} } = props;

  let pdfAPI = "/resume/CV_SANDEEP_KUMAR.pdf";

  return (
    <header className={classnames({ headerPdf: pdf, header: !pdf })}>
      <div className={pdf ? "" : "container"}>
        <div
          className={classnames("row align-items-center", {
            "text-md-start text-center": !pdf,
          })}
        >
          {!pdf && (
            <div className="col-md-2">
              <SanityImage
                {...profilePic}
                height={300}
                style={{ height: "100%", width: "100%", objectFit: "cover" }}
                className="img-thumbnail rounded-circle"
                loading="eager"
                alt="user-pic"
              />
            </div>
          )}
          <div className="col-md">
            <h1 className={classnames("text-white userName")}>{title}</h1>
            <h5 className={classnames("text-white mb-0 subHeading")}>
              {subtitle}
            </h5>
            <div className="half-line" />
          </div>
          {!pdf && (
            <div className="col-md-auto mt-md-0 mt-xxs d-print-none d-block">
              <a
                className="btn btn-dark btn-lg"
                href={pdfAPI}
                rel="noopener noreferrer"
                target="_blank"
              >
                <FontAwesomeIcon className="me-xxxs" icon={faFilePdf} />
                Download as PDF
              </a>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
