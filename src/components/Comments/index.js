import React from 'react';
import { withStyles } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import CommentsPresentational from './CommentsPresentational';
import {
  commentEstate,
  commentProfile,
  commentRenter,
  uncommentEstate,
  uncommentRenter,
  uncommentProfile,
} from '../../redux/actions';
import { styles } from './comments-styles';

function Comments({ comments, classes, label, collectionID, ownerID, userCanComment }) {
  const [state, setState] = React.useState({
    comment: '',
    isWindowOpen: false,
    text: '',
    commentID: '',
  });
  const dispatch = useDispatch();
  const {
    profile: { profile },
    auth: { user },
  } = useSelector((state) => state);

  const toggleWindow = React.useCallback(
    (text = '', commentID = '') => {
      setState((currentState) => ({
        ...currentState,
        isWindowOpen: !currentState.isWindowOpen,
        text,
        commentID,
      }));
    },
    [state],
  );

  const onUncomment = React.useCallback(() => {
    const { commentID } = state;
    if (commentID) {
      if (label === 'estate') {
        dispatch(uncommentEstate({ uncommentedCollection: collectionID, commentID }));
      } else if (label === 'renter') {
        dispatch(uncommentRenter({ uncommentedCollection: collectionID, commentID }));
      } else if (label === 'profile') {
        dispatch(uncommentProfile({ uncommentedCollection: collectionID, commentID }));
      }
    }
    toggleWindow();
  }, [dispatch, collectionID, label, state]);

  const onCommentChange = React.useCallback(
    (e) => {
      const target = e.target;
      setState((currentState) => ({ ...currentState, comment: target.value }));
    },
    [state],
  );

  const onKeyDown = React.useCallback(
    (e) => {
      if (e.target.value) {
        if (e.keyCode === 13 && e.target.value !== '') {
          if (collectionID && e.target.value !== '') {
            if (label === 'estate') {
              dispatch(commentEstate({ text: state.comment, commented_collection: collectionID }));
            } else if (label === 'renter') {
              dispatch(commentRenter({ text: state.comment, commented_collection: collectionID }));
            } else {
              dispatch(
                commentProfile({
                  text: state.comment,
                  commented_collection: collectionID,
                }),
              );
            }
          }
          setState((currentState) => ({ ...currentState, comment: '' }));
        }
      }
    },
    [dispatch, state, collectionID, label],
  );

  return (
    <CommentsPresentational
      userCanComment={userCanComment}
      profile={profile}
      classes={classes}
      onKeyDown={onKeyDown}
      comment={state.comment}
      onCommentChange={onCommentChange}
      comments={comments}
      user={user}
      ownerID={ownerID}
      toggleWindow={toggleWindow}
      onUncomment={onUncomment}
      isWindowOpen={state.isWindowOpen}
      confirmationText={state.text}
    />
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
