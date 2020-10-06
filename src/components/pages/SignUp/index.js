import React from 'react';
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { register, addError } from '../../../redux/actions';
import { useStyles } from './signup-helper';
import SignUpPresentational from './SignUpPresentational';

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

  return <SignUpPresentational classes={classes} onChange={onChange} onSubmit={onSubmit} />;
}

SignUp.propTypes = {
  history: PropTypes.object.isRequired,
};

export default React.memo(withRouter(SignUp));
