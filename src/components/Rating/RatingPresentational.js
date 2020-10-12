import React from 'react';
import PropTypes from 'prop-types';
import StarRatingComponent from 'react-star-rating-component';
import { ConfirmationWindow } from '..';

function RatingPresentational({
  ratingValue,
  onStarClick,
  isClickable,
  isWindowOpen,
  onRate,
  toggleWindow,
  myRating,
}) {
  console.log(isWindowOpen);
  return (
    <React.Fragment>
      {isWindowOpen && (
        <ConfirmationWindow
          confirmationTitle="Rate the page"
          confirmationText={
            <div>
              Do you want to rate the page with the following rating ? Btw, you can change this!
              <div
                className="stars"
                style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}
              >
                <StarRatingComponent
                  value={myRating}
                  starCount={5}
                  onStarClick={(next) => onStarClick(next, false)}
                />
              </div>
            </div>
          }
          open={isWindowOpen}
          confirm={() => onRate(myRating)}
          handleClose={toggleWindow}
        />
      )}
      <div className="stars">
        <StarRatingComponent
          name="rate1"
          starCount={5}
          value={Math.round(ratingValue)}
          onStarClick={isClickable ? (next) => onStarClick(next) : null}
        />
        <div className="rate-block__appraisal">{ratingValue}</div>
      </div>
    </React.Fragment>
  );
}

RatingPresentational.propTypes = {
  ratingValue: PropTypes.number.isRequired,
  onStarClick: PropTypes.func.isRequired,
  isClickable: PropTypes.bool.isRequired,
  isWindowOpen: PropTypes.bool.isRequired,
  onRate: PropTypes.func.isRequired,
  toggleWindow: PropTypes.func.isRequired,
  myRating: PropTypes.number.isRequired,
};

export default RatingPresentational;
