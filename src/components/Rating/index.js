import React from "react";
import StarRatingComponent from "react-star-rating-component";
import "./stars.scss";
import { useDispatch } from "react-redux";
import { rateProfile } from "../../redux/actions";
import { withRouter } from "react-router";
import PropTypes from "prop-types";

const index = ({ match, authUserID }) => {
  const dispatch = useDispatch();
  const [rating, setRating] = React.useState(1);
  const onStarClick = React.useCallback(
    (next) => {
      if (match.params.profileID)
        dispatch(
          rateProfile(
            match.params.profileID === "me"
              ? authUserID
              : match.params.profileID,
            next
          )
        );
      setRating(next);
    },
    [dispatch, setRating, authUserID]
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
};

index.propTypes = {
  match: PropTypes.object,
  authUserID: PropTypes.string,
};

export default React.memo(withRouter(index));
