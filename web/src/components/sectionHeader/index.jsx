import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import classNames from "classnames";

export const SectionHeader = (props) => {
  const { icon, text, dark = false } = props;

  return (
    <h3 className="heading">
      {icon && (
        <span
          className={classNames("fa-layers fa-fw", {
            headingIconDark: dark,
            headingIcon: !dark,
          })}
        >
          <FontAwesomeIcon icon={faCircle} color="#4679bd" />
          <FontAwesomeIcon color="white" icon={icon} transform="shrink-8" />
        </span>
      )}
      <span
        className={classNames({
          headingTextDark: dark,
          headingText: !dark,
        })}
      >
        {text}
      </span>
    </h3>
  );
};

export default SectionHeader;
