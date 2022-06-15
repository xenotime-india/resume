import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

export const StarRating = (props) => {
  const { stars } = props;

  return (
    <span className="text-primary">
      {stars >= 3 && <FontAwesomeIcon color="#4679bd" icon={faStar} />}
      {stars >= 2 && (
        <FontAwesomeIcon color="#4679bd" className="secondStar" icon={faStar} />
      )}
      {stars >= 1 && (
        <FontAwesomeIcon color="#4679bd" className="thirdStar" icon={faStar} />
      )}
    </span>
  );
};

export default StarRating;
