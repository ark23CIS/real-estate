import React from 'react';
import { withRouter } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import {
  getProfileByID,
  getProfile,
  getOwnReservations,
  deleteProfile,
} from '../../../redux/actions';
import ProfilePresentational from './ProfilePresentational';
import './profile.scss';

function Profile({ match, history }) {
  const {
    auth: { user },
    profile: { profiles, profile },
    reservation: { reservations },
    estate: { estates },
    renter: { renters },
  } = useSelector((state) => state);

  const currentProfile = profiles ? profiles[0] : null;

  const dispatch = useDispatch();

  const [isOwnPage, setIsOwnPage] = React.useState(false);

  const [isWindowOpened, setIsWindowOpened] = React.useState(false);

  React.useEffect(() => {
    const updateProfile = () => {
      if (user) {
        dispatch(getOwnReservations());
        if (match.params.profileID === 'me' || user._id === match.params.profileID) {
          if (profile) dispatch(getProfile());
          dispatch(
            getProfileByID(
              match.params.profileID === 'me' || user._id === match.params.profileID
                ? user._id
                : match.params.profileID,
            ),
          );
          setIsOwnPage(true);
        } else {
          dispatch(getProfileByID(match.params.profileID));
        }
      } else {
        if (match.params.profileID !== 'me') dispatch(getProfileByID(match.params.profileID));
      }
    };
    updateProfile();
    const interval = setInterval(updateProfile, 30000);
    return () => clearInterval(interval);
  }, [dispatch, user, match, profile]);

  const toggleWindow = React.useCallback(() => {
    setIsWindowOpened((isWindowOpened) => !isWindowOpened);
  }, [isWindowOpened]);

  const onDeleteProfile = React.useCallback(() => {
    dispatch(deleteProfile(history));
    toggleWindow();
  }, [dispatch]);

  console.log(currentProfile);

  return (
    <ProfilePresentational
      currentProfile={currentProfile}
      isOwnPage={isOwnPage}
      profile={profile}
      renters={renters}
      estates={estates}
      reservations={reservations}
      user={user}
      match={match}
      handleClose={toggleWindow}
      isWindowOpened={isWindowOpened}
      confirm={onDeleteProfile}
    />
  );
}

Profile.propTypes = {
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default React.memo(withRouter(Profile));
