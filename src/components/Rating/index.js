import React from 'react';
import StarRatingComponent from 'react-star-rating-component';
import './stars.scss';
import { useDispatch } from 'react-redux';
import { rateProfile, rateEstate, rateRenter } from '../../redux/actions';
import PropTypes from 'prop-types';

const Rating = ({ authUserID, label, collectionID }) => {
  const dispatch = useDispatch();
  const [rating, setRating] = React.useState(1);

  const onStarClick = React.useCallback(
    (next) => {
      if (label === 'profile') {
        dispatch(rateProfile(collectionID === 'me' ? authUserID : collectionID, next));
      } else if (label === 'estate') {
        dispatch(rateEstate({ rating: next, rated_collection: collectionID }));
      } else if (label === 'renter') {
        dispatch(rateRenter({ rating: next, rated_collection: collectionID }));
      } else if (label === 'profile') {
        dispatch(rateProfile({ rating: next, rated_collection: collectionID }));
      }
      setRating(next);
    },
    [dispatch, collectionID, authUserID],
  );

  return (
    <div className="stars">
      <StarRatingComponent name="rate1" starCount={5} value={rating} onStarClick={onStarClick} />
    </div>
  );
};

Rating.propTypes = {
  authUserID: PropTypes.string,
  label: PropTypes.string,
  collectionID: PropTypes.string,
};

Rating.defaultProps = {
  label: '',
  authUserID: '',
  collectionID: '',
};

export default React.memo(Rating);
