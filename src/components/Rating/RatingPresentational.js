import React from 'react';
import PropTypes from 'prop-types';
import StarRatingComponent from 'react-star-rating-component';

function RatingPresentational({ ratingValue, onStarClick, isClickable }) {
  return (
    <div className="stars">
      <StarRatingComponent
        name="rate1"
        starCount={5}
        value={Math.round(ratingValue)}
        onStarClick={isClickable ? onStarClick : null}
      />
      <div className="rate-block__appraisal">{ratingValue}</div>
    </div>
  );
}

RatingPresentational.propTypes = {
  ratingValue: PropTypes.number.isRequired,
  onStarClick: PropTypes.func.isRequired,
  isClickable: PropTypes.bool.isRequired,
};

export default RatingPresentational;
