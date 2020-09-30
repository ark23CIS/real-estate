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
  isSearchPage,
  isClickable,
}) {
  const dispatch = useDispatch();

  const onThumbDown = React.useCallback(() => {
    if (dislikeType === 'profile') {
      dispatch(dislikeProfile(collectionID));
    } else if (dislikeType === 'estate') {
      dispatch(dislikeEstate(collectionID, isSearchPage));
    } else if (dislikeType === 'renter') {
      dispatch(dislikeRenter(collectionID, isSearchPage));
    }
  }, [dispatch, dislikeType, collectionID]);

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
  isSearchPage: PropTypes.bool,
  isClickable: PropTypes.bool,
};

Dislike.defaultProps = {
  dislikeType: '',
  isActive: false,
  isSearchPage: false,
  isClickable: false,
};

export default Dislike;
