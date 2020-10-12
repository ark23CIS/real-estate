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

  const [state, setState] = React.useState({ isRatingWindowOpen: false });

  const onStarClick = React.useCallback(
    (next, needToToggle = true) => {
      setState((state) => ({
        ...state,
        myRating: next,
        isRatingWindowOpen: needToToggle ? !state.isRatingWindowOpen : state.isRatingWindowOpen,
      }));
    },
    [state],
  );

  const toggleWindow = React.useCallback(() => {
    setState((state) => ({ ...state, isRatingWindowOpen: !state.isRatingWindowOpen }));
  }, [state]);

  const onRate = React.useCallback(
    (myRating) => {
      if (label === 'profile') {
        dispatch(rateProfile(collectionID === 'me' ? authUserID : collectionID, myRating));
      } else if (label === 'estate') {
        dispatch(
          rateEstate({ rating: myRating, rated_collection: collectionID, pageType, pageOwnerID }),
        );
      } else if (label === 'renter') {
        dispatch(
          rateRenter({ rating: myRating, rated_collection: collectionID, pageType, pageOwnerID }),
        );
      }
      toggleWindow();
      console.log('onRate');
    },
    [dispatch, collectionID, authUserID, label, state],
  );

  console.log(state);

  return (
    <RatingPresentational
      isClickable={isClickable}
      ratingValue={ratingValue}
      onStarClick={onStarClick}
      onRate={onRate}
      isWindowOpen={state.isRatingWindowOpen}
      toggleWindow={toggleWindow}
      myRating={state.myRating}
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
