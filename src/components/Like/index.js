import React from 'react';
import { ThumbUp } from '@material-ui/icons';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { likeEstate, likeRenter, likeProfile } from '../../redux/actions';

function Like({ likeType, collectionID, amountOflikes, isActive }) {
  const dispatch = useDispatch();
  const onThumbUp = React.useCallback(() => {
    if (likeType === 'profile') {
      dispatch(likeProfile(collectionID));
    } else if (likeType === 'estate') {
      dispatch(likeEstate(collectionID));
    } else if (likeType === 'renter') {
      dispatch(likeRenter(collectionID));
    }
  }, [dispatch, likeType, collectionID]);

  return (
    <div>
      <ThumbUp onClick={onThumbUp} className={isActive ? 'thumb-active cursor' : 'cursor'} />
      <span>{amountOflikes}</span>
    </div>
  );
}

Like.propTypes = {
  likeType: PropTypes.string,
  collectionID: PropTypes.string.isRequired,
  amountOflikes: PropTypes.number.isRequired,
  isActive: PropTypes.bool,
};

Like.defaultProps = {
  likeType: '',
  isActive: false,
};

export default Like;
