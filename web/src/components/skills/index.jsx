import classnames from "classnames";
import React from "react";
import { FaCheck } from "react-icons/fa";

import { SectionHeader } from "./../sectionHeader";
import { StarRating } from "./../starRating";

export const Skills = (props) => {
  const { skills, pdf = false } = props;

  return (
    <article className="mt-xs">
      {pdf && <SectionHeader text="Skills" dark />}
      {!pdf && <SectionHeader icon={FaCheck} text="Skills & Expertise" />}
      <div className="row my-xxs">
        {skills.map((skill, index) => (
          <div
            className={classnames("col-lg", {
              "mt-lg-0 mt-xxs": index > 0,
            })}
            key={skill.id}
          >
            <h4 className="h5 text-uppercase">
              <StarRating stars={skill.level} /> {skill.levelName}
            </h4>
            <p>{skill.skills.map(({ value }) => value).join(", ")}</p>
          </div>
        ))}
      </div>
    </article>
  );
};

export default Skills;
