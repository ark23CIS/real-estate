import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../../redux/actions';
import { useStyles } from './signin-helper';
import SignInRepresentational from './SignInRepresentational';

export default function SignIn() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const [loginData, setLoginData] = React.useState({
    password: '',
    email: '',
  });

  const onClick = React.useCallback(() => {
    dispatch(login(loginData));
  }, [dispatch, loginData]);

  const onChange = React.useCallback(
    (e) => {
      setLoginData({
        ...loginData,
        [e.target.name]: e.target.value,
      });
    },
    [loginData],
  );

  if (auth.isAuthenticated && auth.user) {
    return <Redirect to={`/profiles/me`} />;
  }

  return <SignInRepresentational classes={classes} onChange={onChange} onClick={onClick} />;
}
