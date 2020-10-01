import React from 'react';
import StarRatingComponent from 'react-star-rating-component';
import './stars.scss';
import { useDispatch } from 'react-redux';
import { rateProfile, rateEstate, rateRenter } from '../../redux/actions';
import PropTypes from 'prop-types';

const Rating = ({
  authUserID,
  label,
  collectionID,
  ratingValue,
  pageType,
  isClickable,
  pageOwnerID,
}) => {
  const dispatch = useDispatch();

  const onStarClick = React.useCallback(
    (next) => {
      if (label === 'profile') {
        dispatch(rateProfile(collectionID === 'me' ? authUserID : collectionID, next));
      } else if (label === 'estate') {
        dispatch(
          rateEstate({ rating: next, rated_collection: collectionID, pageType, pageOwnerID }),
        );
      } else if (label === 'renter') {
        dispatch(
          rateRenter({ rating: next, rated_collection: collectionID, pageType, pageOwnerID }),
        );
      }
    },
    [dispatch, collectionID, authUserID],
  );

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
};

Rating.propTypes = {
  authUserID: PropTypes.string,
  label: PropTypes.string,
  collectionID: PropTypes.string,
  ratingValue: PropTypes.number,
  pageType: PropTypes.string,
  isClickable: PropTypes.bool,
  pageOwnerID: PropTypes.string,
};

Rating.defaultProps = {
  label: '',
  authUserID: '',
  collectionID: '',
  ratingValue: 1,
  pageType: PropTypes.string,
  isClickable: PropTypes.bool,
  pageOwnerID: '',
};

export default React.memo(Rating);
