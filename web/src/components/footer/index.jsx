import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

export const Footer = (props) => {
  const { personalInformation, links, pdf = false } = props;
  const { fullName } = personalInformation;

  return (
    <footer className="footer">
      <div className={pdf ? "container-fluid" : "container"}>
        {!pdf && links && (
          <div className="row gx-0 justify-content-center">
            {links.map((link) => (
              <div className="col-auto" key={link.href}>
                <a
                  className="d-block fa-3x"
                  href={link.href}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <span className="sr-only">
                    {personalInformation.given_name} on {link.title}
                  </span>
                  <span className="fa-layers fa-fw">
                    <FontAwesomeIcon icon={faCircle} />
                    <FontAwesomeIcon
                      aria-hidden
                      color="white"
                      icon={["fab", link.icon_name]}
                      transform="shrink-8"
                    />
                  </span>
                </a>
              </div>
            ))}
          </div>
        )}

        <div className={!pdf && links?.length ? "mt-xxs" : ""}>
          Copyright ©{new Date().getFullYear()} {fullName}
        </div>
        <div className="mt-xxxs">
          <small>
            This résumé was generated with{" "}
            <a
              className="footerLink"
              href="https://www.gatsbyjs.com/"
              rel="noopener noreferrer"
              target="_blank"
            >
              Gatsby
            </a>{" "}
            ,{" "}
            <a
              className="footerLink"
              href="https://www.sanity.io/"
              rel="noopener noreferrer"
              target="_blank"
            >
              Sanity
            </a>{" "}
            and deployed on{" "}
            <a
              className="footerLink"
              href="https://vercel.com/"
              rel="noopener noreferrer"
              target="_blank"
            >
              Vercel
            </a>
            .
          </small>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
