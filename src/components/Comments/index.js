import React from "react";
import {
  CardHeader,
  TextField,
  Avatar,
  Icon,
  withStyles,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const styles = (theme) => ({
  cardHeader: {
    paddingTop: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
  },
  smallAvatar: {
    width: 25,
    height: 25,
  },
  commentField: {
    width: "96%",
  },
  commentText: {
    backgroundColor: "white",
    padding: theme.spacing.unit,
    margin: `2px ${theme.spacing.unit * 2}px 2px 2px`,
  },
  commentDate: {
    display: "block",
    color: "gray",
    fontSize: "0.8em",
  },
  commentDelete: {
    fontSize: "1.6em",
    verticalAlign: "middle",
    cursor: "pointer",
  },
});

function index({ comments, classes }) {
  const commentBody = (item) => {
    return (
      <p className={classes.commentText}>
        <Link to={"/user/"}>ee</Link>
        <br />
        text
        <span className={classes.commentDate}>
          {new Date(item.created).toDateString()} |
          {false && (
            <Icon onClick={null} className={classes.commentDelete}>
              delete
            </Icon>
          )}
        </span>
      </p>
    );
  };

  return (
    <div>
      <CardHeader
        avatar={
          <Avatar className={classes.smallAvatar} src={"/api/users/photo/"} />
        }
        title={
          <TextField
            onKeyDown={null}
            multiline
            value={null}
            onChange={null}
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
                src={"/api/users/photo/"}
              />
            }
            title={commentBody(item)}
            className={classes.cardHeader}
            key={i}
          />
        );
      })}
    </div>
  );
}

index.propTypes = {
  comments: PropTypes.array.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(index);
