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

function SignInRepresentational({ classes, onChange, onClick, errors, signInFields }) {
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
            {signInFields.map((field) => (
              <TextField
                {...field}
                variant="outlined"
                margin="normal"
                autoFocus
                onChange={onChange}
                required
                fullWidth
                helperText={
                  errors.map((error) => error.param).includes(field.name)
                    ? errors.filter(({ param }) => param === field.name)[0].msg
                    : ''
                }
                error={errors.map((error) => error.param).includes(field.name)}
              />
            ))}
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
  errors: PropTypes.arrayOf(PropTypes.object).isRequired,
  signInFields: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)).isRequired,
};

export default SignInRepresentational;
