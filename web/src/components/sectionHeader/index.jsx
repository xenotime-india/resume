import React from "react";
import classNames from "classnames";
import { FaCircle } from "react-icons/fa";

export const SectionHeader = (props) => {
  const { icon: FaIcon, text, dark = false } = props;

  return (
    <h3 className="heading">
      {FaIcon && (
        <span
          className={classNames("fa-stack small", {
            headingIconDark: dark,
            headingIcon: !dark,
          })}
        >
          <FaCircle color="#4679bd" className="fa-stack-2x" size={32} />
          <FaIcon color="#ffffff" size={15} className="fa-stack-1x" />
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
