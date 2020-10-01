import React from 'react';
import { ThumbUp } from '@material-ui/icons';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { likeEstate, likeRenter, likeProfile } from '../../redux/actions';

function Like({
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
    <div className="rate-block">
      <ThumbUp
        onClick={isClickable ? onThumbUp : null}
        className={isActive ? 'thumb-active cursor' : 'cursor'}
      />
      <div className="rate-block__appraisal">{amountOflikes}</div>
    </div>
  );
}

Like.propTypes = {
  likeType: PropTypes.string,
  collectionID: PropTypes.string.isRequired,
  amountOflikes: PropTypes.number.isRequired,
  isActive: PropTypes.bool,
  pageType: PropTypes.string,
  isClickable: PropTypes.bool,
  pageOwnerID: PropTypes.string,
};

Like.defaultProps = {
  likeType: '',
  isActive: false,
  pageType: '',
  isClickAble: false,
  pageOwnerID: '',
};

export default Like;
