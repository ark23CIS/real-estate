import React from 'react';
import { CardHeader, TextField, Avatar, withStyles } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import CommentBody from './CommentBody';
import { commentEstate, commentProfile, commentRenter } from '../../redux/actions';
import { styles } from './comments-styles';

function Comments({ comments, classes, label, collectionID }) {
  const [comment, setComment] = React.useState('');
  const dispatch = useDispatch();
  const { profile } = useSelector((state) => state.profile);

  const onCommentChange = React.useCallback(
    (e) => {
      setComment(e.target.value);
    },
    [setComment],
  );

  const onKeyDown = React.useCallback(
    (e) => {
      if (e.keyCode === 13 && e.target.value) {
        if (collectionID) {
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
    },
    [dispatch, comment, collectionID],
  );

  return (
    <div>
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
          />
        }
        className={classes.cardHeader}
      />
      {comments.map((item, i) => {
        return (
          <CardHeader
            avatar={
              <Avatar
                className={classes.smallAvatar}
                src={item.postedBy && item.postedBy.photo !== 'default' ? item.postedBy.photo : ''}
              />
            }
            title={
              <CommentBody
                item={item}
                classes={classes}
                collectionID={collectionID}
                userID={profile.user._id}
                label={label}
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
  comments: PropTypes.array,
  classes: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  collectionID: PropTypes.string,
};

Comments.defaultProps = {
  comments: [],
  collectionID: '',
};

export default withStyles(styles)(React.memo(Comments));
