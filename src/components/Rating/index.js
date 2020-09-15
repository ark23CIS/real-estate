import React from "react";
import StarRatingComponent from "react-star-rating-component";
import "./stars.scss";

function index() {
  const [rating, setRating] = React.useState(1);
  const onStarClick = React.useCallback(
    (next) => {
      console.log(next);
      setRating(next);
    },
    [setRating]
  );
  return (
    <div className="stars">
      <StarRatingComponent
        name="rate1"
        starCount={5}
        value={rating}
        onStarClick={onStarClick}
      />
    </div>
  );
}

export default index;
