import React from 'react';
import { CardHeader, TextField, Avatar, withStyles } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import CommentBody from './CommentBody';
import { commentEstate, commentProfile, commentRenter } from '../../redux/actions';
import { styles } from './comments-styles';

function Comments({ comments, classes, label, collectionID, ownerID, userCanComment }) {
  const [comment, setComment] = React.useState('');
  const dispatch = useDispatch();
  const {
    profile: { profile },
    auth: { user },
  } = useSelector((state) => state);

  const onCommentChange = React.useCallback(
    (e) => {
      setComment(e.target.value);
    },
    [setComment],
  );

  const onKeyDown = React.useCallback(
    (e) => {
      if (e.target.value) {
        if (e.keyCode === 13 && e.target.value !== '') {
          if (collectionID && e.target.value !== '') {
            if (label === 'estate') {
              dispatch(commentEstate({ text: comment, commented_collection: collectionID }));
            } else if (label === 'renter') {
              dispatch(commentRenter({ text: comment, commented_collection: collectionID }));
            } else {
              dispatch(
                commentProfile({
                  text: comment,
                  commented_collection: collectionID,
                }),
              );
            }
          }
          setComment('');
        }
      }
    },
    [dispatch, comment, collectionID],
  );

  return (
    <div>
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
                  collectionID={collectionID}
                  userID={user ? user._id : ''}
                  label={label}
                  ownerID={ownerID}
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

Comments.propTypes = {
  comments: PropTypes.array.isRequired,
  classes: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  collectionID: PropTypes.string.isRequired,
  ownerID: PropTypes.string.isRequired,
  userCanComment: PropTypes.string,
};

Comments.defaultProps = {
  userCanComment: false,
};

export default withStyles(styles)(React.memo(Comments));
