import React from 'react';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import {
  Container,
  Typography,
  Box,
  Grid,
  Link,
  TextField,
  CssBaseline,
  Button,
  Avatar,
} from '@material-ui/core';
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { register, addError } from '../../../redux/actions';
import { useStyles, Copyright } from './signup-helper';

function SignUp({ history }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const [registrationData, setRegistrationData] = React.useState({
    firstName: '',
    lastName: '',
    password: '',
    email: '',
    passwordConfirm: '',
  });

  const onSubmit = React.useCallback(
    (e) => {
      e.preventDefault();
      if (registrationData.password !== registrationData.passwordConfirm) {
        dispatch(addError('Password do not match'));
        return;
      }
      dispatch(register({ ...registrationData, history }));
    },
    [dispatch, registrationData],
  );

  const onChange = React.useCallback(
    (e) => {
      setRegistrationData({
        ...registrationData,
        [e.target.name]: e.target.value,
      });
    },
    [registrationData],
  );

  if (auth.isAuthenticated && auth.user) {
    return <Redirect to={`/profiles/me`} />;
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper} style={{ marginTop: 0 }}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <div className={classes.form}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                onChange={onChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                onChange={onChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={onChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={onChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="passwordConfirm"
                label="Confirm Password"
                type="password"
                id="confirmPassword"
                autoComplete="current-password"
                onChange={onChange}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={onSubmit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="#/signin" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </div>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}

SignUp.propTypes = {
  history: PropTypes.object.isRequired,
};

export default React.memo(withRouter(SignUp));
