import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useStyles } from '../SignIn/signin-helper';
import { createProfile } from '../../../redux/actions';
import { socials } from './createProfile-helper';
import CreateProfilePresentational from './CreateProfilePresentational';

function SignIn({ socials, history }) {
  const classes = useStyles();
  const [profileData, setProfileData] = React.useState({});
  const dispatch = useDispatch();
  const {
    profile: { profile },
  } = useSelector((state) => state);

  const onFieldChange = React.useCallback(
    (e) => {
      const { value, name } = e.target;
      setProfileData((profileData) => ({
        ...profileData,
        [name]: value,
      }));
    },
    [profileData],
  );

  const onClick = React.useCallback(() => {
    dispatch(createProfile(profileData, history));
  }, [profileData]);

  const photoChange = React.useCallback(
    (e) => {
      const target = e.target;
      const data = new FormData();
      data.append('file', target.files[0]);
      setProfileData((profileData) => ({
        ...profileData,
        photo: data,
      }));
    },
    [profileData],
  );

  if (profile) {
    return <Redirect to={`/profiles/me`} />;
  }

  return (
    <CreateProfilePresentational
      classes={classes}
      socials={socials}
      onFieldChange={onFieldChange}
      photoChange={photoChange}
      onClick={onClick}
    />
  );
}

SignIn.propTypes = {
  socials: PropTypes.arrayOf(PropTypes.object),
  history: PropTypes.object.isRequired,
};

SignIn.defaultProps = {
  socials,
};

export default React.memo(withRouter(SignIn));
