import React from "react";
import { FaStar } from "react-icons/fa";

export const StarRating = (props) => {
  const { stars } = props;

  return (
    <span className="text-primary">
      {stars >= 3 && (
        <FaStar color="#4679bd" style={{ verticalAlign: "top" }} />
      )}
      {stars >= 2 && (
        <FaStar
          color="#4679bd"
          className="secondStar"
          style={{ verticalAlign: "top" }}
        />
      )}
      {stars >= 1 && (
        <FaStar
          color="#4679bd"
          className="thirdStar"
          style={{ verticalAlign: "top" }}
        />
      )}
    </span>
  );
};

export default StarRating;
