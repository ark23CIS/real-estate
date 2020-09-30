import React from 'react';
import { Comment } from '@material-ui/icons';
import PropTypes from 'prop-types';

function CommentsIcon({ commentsAmount }) {
  return (
    <div className="rate-block">
      <Comment className="comment" />
      <div className="rate-block__appraisal">{commentsAmount}</div>
    </div>
  );
}

CommentsIcon.propTypes = {
  commentsAmount: PropTypes.number,
};

export default CommentsIcon;
