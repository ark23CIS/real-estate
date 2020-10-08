import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login, clearError } from '../../../redux/actions';
import { useStyles, signInFields } from './signin-helper';
import SignInRepresentational from './SignInRepresentational';

export default function SignIn() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { auth, error: errors } = useSelector((state) => state);
  const [loginData, setLoginData] = React.useState({
    password: '',
    email: '',
  });

  React.useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

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

  return (
    <SignInRepresentational
      classes={classes}
      onChange={onChange}
      onClick={onClick}
      errors={errors}
      signInFields={signInFields}
    />
  );
}
