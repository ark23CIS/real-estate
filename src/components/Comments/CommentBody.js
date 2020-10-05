import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import DeleteIcon from '@material-ui/icons/Delete';
import PropTypes from 'prop-types';
import { uncommentEstate, uncommentRenter, uncommentProfile } from '../../redux/actions';

function CommentBody({ item, classes, collectionID, userID, ownerID, label }) {
  const dispatch = useDispatch();

  const onUncomment = React.useCallback(
    (commentID) => {
      if (label === 'estate') {
        dispatch(uncommentEstate({ uncommentedCollection: collectionID, commentID }));
      } else if (label === 'renter') {
        dispatch(uncommentRenter({ uncommentedCollection: collectionID, commentID }));
      } else {
        dispatch(uncommentProfile({ uncommentedCollection: collectionID, commentID }));
      }
    },
    [dispatch, collectionID],
  );

  return (
    <p className={classes.commentText}>
      <Link to={`/profiles/${item.postedBy && item.postedBy.user ? item.postedBy.user._id : ''}`}>
        {item.postedBy && item.postedBy.user
          ? `${item.postedBy.user.firstName} ${item.postedBy.user.lastName}`
          : 'Anonymous'}
      </Link>
      <br />
      {item.text}
      <span className={classes.commentDate}>
        {new Date(item.created).toDateString()} |
        {item.postedBy &&
          item.postedBy.user &&
          userID &&
          (item.postedBy.user._id === userID || ownerID === userID) && (
            <DeleteIcon onClick={() => onUncomment(item._id)} className={classes.commentDelete}>
              delete
            </DeleteIcon>
          )}
      </span>
    </p>
  );
}

CommentBody.propTypes = {
  item: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  collectionID: PropTypes.string.isRequired,
  userID: PropTypes.string.isRequired,
  ownerID: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

export default CommentBody;
