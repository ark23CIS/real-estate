import React from 'react';
import { CardHeader, TextField, Avatar } from '@material-ui/core';
import PropTypes from 'prop-types';
import CommentBody from './CommentBody';
import { ConfirmationWindow } from '..';

function CommentsPresentational({
  userCanComment,
  profile,
  classes,
  onKeyDown,
  comment,
  onCommentChange,
  comments,
  user,
  ownerID,
  toggleWindow,
  onUncomment,
  isWindowOpen,
  confirmationText,
}) {
  return (
    <div>
      {isWindowOpen && (
        <ConfirmationWindow
          open={isWindowOpen}
          handleClose={toggleWindow}
          confirm={onUncomment}
          confirmationText={`Text of the message: ${confirmationText}`}
          confirmationTitle="Do you want to delete the following message ?"
        />
      )}
      {userCanComment && (
        <CardHeader
          avatar={
            <Avatar
              className={classes.smallAvatar}
              src={profile ? (profile.photo === 'default' ? '' : profile.photo) : ''}
            />
          }
          title={
            <TextField
              onKeyDown={onKeyDown}
              multiline
              value={comment}
              onChange={onCommentChange}
              placeholder="Write something ..."
              className={classes.commentField}
              margin="normal"
              style={{ color: 'black' }}
            />
          }
          className={classes.cardHeader}
        />
      )}

      {comments &&
        comments.map((item, i) => {
          return (
            <CardHeader
              avatar={
                <Avatar
                  className={classes.smallAvatar}
                  src={
                    item.postedBy && item.postedBy.photo !== 'default' ? item.postedBy.photo : ''
                  }
                />
              }
              title={
                <CommentBody
                  item={item}
                  classes={classes}
                  userID={user ? user._id : ''}
                  ownerID={ownerID}
                  toggleWindow={toggleWindow}
                  onUncomment={onUncomment}
                  isWindowOpen={isWindowOpen}
                />
              }
              className={classes.cardHeader}
              key={`${i}_${item.created}`}
            />
          );
        })}
    </div>
  );
}

CommentsPresentational.propTypes = {
  userCanComment: PropTypes.bool.isRequired,
  isWindowOpen: PropTypes.bool.isRequired,
  profile: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  onKeyDown: PropTypes.func.isRequired,
  comment: PropTypes.string.isRequired,
  onCommentChange: PropTypes.func.isRequired,
  comments: PropTypes.arrayOf(PropTypes.object).isRequired,
  user: PropTypes.object.isRequired,
  ownerID: PropTypes.string.isRequired,
  confirmationText: PropTypes.string.isRequired,
  toggleWindow: PropTypes.func.isRequired,
  onUncomment: PropTypes.func.isRequired,
};

export default CommentsPresentational;
