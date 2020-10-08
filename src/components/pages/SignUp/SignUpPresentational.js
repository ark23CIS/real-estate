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
import PropTypes from 'prop-types';
import { Copyright, signUpFields } from './signup-helper';

function SignUpPresentational({ classes, onChange, onSubmit, errors }) {
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
            {signUpFields.map((field) => (
              <Grid item xs={12} sm={field.sm ? field.sm : 12}>
                <TextField
                  {...field}
                  variant="outlined"
                  required
                  fullWidth
                  autoFocus
                  helperText={
                    errors.map((error) => error.param).includes(field.name)
                      ? errors.filter(({ param }) => param === field.name)[0].msg
                      : ''
                  }
                  error={errors.map((error) => error.param).includes(field.name)}
                  onChange={onChange}
                />
              </Grid>
            ))}
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

SignUpPresentational.propTypes = {
  classes: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  errors: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default SignUpPresentational;
