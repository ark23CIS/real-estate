import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { rateProfile, rateEstate, rateRenter } from '../../redux/actions';
import RatingPresentational from './RatingPresentational';
import './stars.scss';

const RatingContainer = ({
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
    <RatingPresentational
      isClickable={isClickable}
      ratingValue={ratingValue}
      onStarClick={onStarClick}
    />
  );
};

RatingContainer.propTypes = {
  authUserID: PropTypes.string,
  label: PropTypes.string,
  collectionID: PropTypes.string,
  ratingValue: PropTypes.number,
  pageType: PropTypes.string,
  isClickable: PropTypes.bool,
  pageOwnerID: PropTypes.string,
};

RatingContainer.defaultProps = {
  label: '',
  authUserID: '',
  collectionID: '',
  ratingValue: 1,
  pageType: PropTypes.string,
  isClickable: PropTypes.bool,
  pageOwnerID: '',
};

export default React.memo(RatingContainer);
