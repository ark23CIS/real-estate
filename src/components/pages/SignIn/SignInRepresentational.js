import React from 'react';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import {
  Container,
  Typography,
  Box,
  Grid,
  Link,
  TextField,
  Avatar,
  Button,
  CssBaseline,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import { Copyright } from '../SignUp/signup-helper';

function SignInRepresentational({ classes, onChange, onClick }) {
  return (
    <div>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper} style={{ marginTop: 0 }}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <div className={classes.form}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={onChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={onChange}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={onClick}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <Link href="#/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </div>
        </div>
        <Box mt={8}>
          <Copyright />
        </Box>
      </Container>
    </div>
  );
}

SignInRepresentational.propTypes = {
  classes: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default SignInRepresentational;
