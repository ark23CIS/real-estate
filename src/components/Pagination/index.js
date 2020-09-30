import React from 'react';
import { Pagination } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      marginTop: theme.spacing(2),
    },
  },
}));

function index({ postsPerPage, totalPosts, callback }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Pagination
        className="pagination"
        count={Math.ceil(totalPosts / postsPerPage)}
        variant="outlined"
        shape="rounded"
        onChange={(_, number) => callback('activePage', parseInt(number))}
      />
    </div>
  );
}

index.propTypes = {
  postsPerPage: PropTypes.number,
  totalPosts: PropTypes.number,
  callback: PropTypes.func,
};

index.defaultProps = {
  postsPerPage: 1,
  totalPosts: 2,
};

export default index;
