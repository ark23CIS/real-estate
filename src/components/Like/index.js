import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { likeEstate, likeRenter, likeProfile } from '../../redux/actions';
import LikePresentational from './LikePresentational';

function LikeContainer({
  likeType,
  collectionID,
  amountOflikes,
  isActive,
  pageType,
  isClickable,
  pageOwnerID,
}) {
  const dispatch = useDispatch();

  const onThumbUp = React.useCallback(() => {
    if (likeType === 'profile') {
      dispatch(likeProfile(collectionID));
    } else if (likeType === 'estate') {
      dispatch(likeEstate(collectionID, pageType, pageOwnerID));
    } else if (likeType === 'renter') {
      dispatch(likeRenter(collectionID, pageType, pageOwnerID));
    }
  }, [dispatch, likeType, collectionID, pageType, pageOwnerID]);

  return (
    <LikePresentational
      amountOflikes={amountOflikes}
      isActive={isActive}
      isClickable={isClickable}
      onThumbUp={onThumbUp}
    />
  );
}

LikeContainer.propTypes = {
  likeType: PropTypes.string,
  collectionID: PropTypes.string.isRequired,
  amountOflikes: PropTypes.number.isRequired,
  isActive: PropTypes.bool,
  pageType: PropTypes.string,
  isClickable: PropTypes.bool,
  pageOwnerID: PropTypes.string,
};

LikeContainer.defaultProps = {
  likeType: '',
  isActive: false,
  pageType: '',
  isClickAble: false,
  pageOwnerID: '',
};

export default LikeContainer;
