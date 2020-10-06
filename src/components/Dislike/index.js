import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import DislikePresentational from './DislikePresentational';
import { dislikeEstate, dislikeProfile, dislikeRenter } from '../../redux/actions';

function DislikeContainer({
  dislikeType,
  collectionID,
  amountOfDislikes,
  isActive,
  pageType,
  isClickable,
  pageOwnerID,
}) {
  const dispatch = useDispatch();

  const onThumbDown = React.useCallback(() => {
    if (dislikeType === 'profile') {
      dispatch(dislikeProfile(collectionID));
    } else if (dislikeType === 'estate') {
      dispatch(dislikeEstate(collectionID, pageType, pageOwnerID));
    } else if (dislikeType === 'renter') {
      dispatch(dislikeRenter(collectionID, pageType, pageOwnerID));
    }
  }, [dispatch, dislikeType, collectionID, pageType, pageOwnerID]);

  return (
    <DislikePresentational
      amountOfDislikes={amountOfDislikes}
      isActive={isActive}
      isClickable={isClickable}
      onThumbDown={onThumbDown}
    />
  );
}

DislikeContainer.propTypes = {
  dislikeType: PropTypes.string,
  collectionID: PropTypes.string.isRequired,
  amountOfDislikes: PropTypes.number.isRequired,
  isActive: PropTypes.bool,
  pageType: PropTypes.string,
  isClickable: PropTypes.bool,
  pageOwnerID: PropTypes.string,
};

DislikeContainer.defaultProps = {
  dislikeType: '',
  isActive: false,
  pageType: '',
  isClickable: false,
  pageOwnerID: '',
};

export default DislikeContainer;
