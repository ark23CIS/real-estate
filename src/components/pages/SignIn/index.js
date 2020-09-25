import React from "react";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
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
} from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../../../redux/actions";
import { Redirect } from "react-router-dom";
import { Copyright } from "../SignUp/signup-helper";
import { useStyles } from "./signin-helper";

export default function SignIn() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const [loginData, setLoginData] = React.useState({
    password: "",
    email: "",
  });
  const onClick = React.useCallback(async () => {
    dispatch(login(loginData));
  }, [dispatch, loginData]);
  const onChange = React.useCallback(
    (e) => {
      setLoginData({
        ...loginData,
        [e.target.name]: e.target.value,
      });
    },
    [loginData]
  );
  if (auth.isAuthenticated && auth.user) {
    return <Redirect to={`/profiles/me`} />;
  }

  return (
    <Container component="main" maxWidth="xs" className="mu-block">
      <CssBaseline />
      <div className={classes.paper}>
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
  );
}
