import React from "react";
import * as FontAwesomeIcon from "react-icons/fa";
import { FaCircle } from "react-icons/fa";

export const Footer = (props) => {
  const { personalInformation, pdf = false } = props;
  const { fullName, links } = personalInformation;

  const linkRender = ({ link }) => {
    const FaIcon = FontAwesomeIcon[link.iconName];
    return (
      <div className="col-auto" key={link.href}>
        <a
          className="d-block fa-3x"
          href={link.href}
          rel="noopener noreferrer"
          target="_blank"
        >
          <span className="sr-only">
            {personalInformation.fullName} on {link.title}
          </span>
          <span className="fa-stack small">
            <FaCircle className="fa-stack-2x icon-background" />
            <FaIcon color="#ffffff" size={25} className="fa-stack-1x" />
          </span>
        </a>
      </div>
    );
  };

  return (
    <footer className="footer">
      <div className={pdf ? "container-fluid" : "container"}>
        {!pdf && links && (
          <div className="row gx-0 justify-content-center">
            {links.map(linkRender)}
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
