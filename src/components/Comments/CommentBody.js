import React from 'react';
import { Link } from 'react-router-dom';
import DeleteIcon from '@material-ui/icons/Delete';
import PropTypes from 'prop-types';

function CommentBody({ item, classes, userID, ownerID, toggleWindow }) {
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
            <DeleteIcon
              className={classes.commentDelete}
              onClick={() => toggleWindow(item.text, item._id)}
            >
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
  userID: PropTypes.string.isRequired,
  ownerID: PropTypes.string.isRequired,
  toggleWindow: PropTypes.func.isRequired,
};

export default CommentBody;
