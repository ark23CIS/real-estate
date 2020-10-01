import React from 'react';
import { ThumbDown } from '@material-ui/icons';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { dislikeEstate, dislikeProfile, dislikeRenter } from '../../redux/actions';

function Dislike({
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
    <div className="rate-block">
      <ThumbDown
        onClick={isClickable ? onThumbDown : null}
        className={isActive ? 'thumb-active cursor' : 'cursor'}
      />
      <div className="rate-block__appraisal">{amountOfDislikes}</div>
    </div>
  );
}

Dislike.propTypes = {
  dislikeType: PropTypes.string,
  collectionID: PropTypes.string.isRequired,
  amountOfDislikes: PropTypes.number.isRequired,
  isActive: PropTypes.bool,
  pageType: PropTypes.string,
  isClickable: PropTypes.bool,
  pageOwnerID: PropTypes.string,
};

Dislike.defaultProps = {
  dislikeType: '',
  isActive: false,
  pageType: '',
  isClickable: false,
  pageOwnerID: '',
};

export default Dislike;
