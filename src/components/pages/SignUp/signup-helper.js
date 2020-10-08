import React from 'react';
import { makeStyles, Typography, Link } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    marginTop: theme.spacing(3),
    margin: theme.spacing(3, 0, 2),
  },
}));

export const Copyright = () => {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="#">
        Real Estate
      </Link>{' '}
      {new Date().getFullYear()}.
    </Typography>
  );
};

export const signUpFields = [
  {
    sm: 6,
    id: 'firstName',
    label: 'First Name',
    name: 'firstName',
    autoComplete: 'fname',
  },
  {
    sm: 6,
    id: 'lastName',
    label: 'Last Name',
    name: 'lastName',
    autoComplete: 'lname',
  },
  {
    id: 'email',
    label: 'Email Address',
    name: 'email',
    autoComplete: 'email',
  },
  {
    id: 'password',
    label: 'Password',
    type: 'password',
    name: 'password',
    autoComplete: 'current-password',
  },
  {
    id: 'passwordConfirm',
    label: 'Confirm Password',
    type: 'password',
    name: 'passwordConfirm',
    autoComplete: 'current-password',
  },
];
