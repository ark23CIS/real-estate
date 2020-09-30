import React from 'react';
import { ThumbUp } from '@material-ui/icons';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { likeEstate, likeRenter, likeProfile } from '../../redux/actions';

function Like({ likeType, collectionID, amountOflikes, isActive, isSearchPage, isClickable }) {
  const dispatch = useDispatch();
  const onThumbUp = React.useCallback(() => {
    if (likeType === 'profile') {
      dispatch(likeProfile(collectionID));
    } else if (likeType === 'estate') {
      dispatch(likeEstate(collectionID, isSearchPage));
    } else if (likeType === 'renter') {
      dispatch(likeRenter(collectionID, isSearchPage));
    }
  }, [dispatch, likeType, collectionID]);

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
  isSearchPage: PropTypes.bool,
  isClickable: PropTypes.bool,
};

Like.defaultProps = {
  likeType: '',
  isActive: false,
  isSearchPage: false,
  isClickAble: false,
};

export default Like;
