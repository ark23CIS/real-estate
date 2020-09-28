import React from 'react';
import { ThumbDown } from '@material-ui/icons';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { dislikeEstate, dislikeProfile, dislikeRenter } from '../../redux/actions';

function Dislike({ dislikeType, collectionID, amountOfDislikes, isActive }) {
  const dispatch = useDispatch();

  const onThumbDown = React.useCallback(() => {
    if (dislikeType === 'profile') {
      dispatch(dislikeProfile(collectionID));
    } else if (dislikeType === 'estate') {
      dispatch(dislikeEstate(collectionID));
    } else if (dislikeType === 'renter') {
      dispatch(dislikeRenter(collectionID));
    }
  }, [dispatch, dislikeType, collectionID]);

  return (
    <div>
      <ThumbDown onClick={onThumbDown} className={isActive ? 'thumb-active cursor' : 'cursor'} />
      <span>{amountOfDislikes}</span>
    </div>
  );
}

Dislike.propTypes = {
  dislikeType: PropTypes.string,
  collectionID: PropTypes.string.isRequired,
  amountOfDislikes: PropTypes.number.isRequired,
  isActive: PropTypes.bool,
};

Dislike.defaultProps = {
  dislikeType: '',
  isActive: false,
};

export default Dislike;
