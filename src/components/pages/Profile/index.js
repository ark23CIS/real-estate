import React from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Avatar } from '@material-ui/core';
import { Edit } from '@material-ui/icons';
import PropTypes from 'prop-types';
import { SocialIcon } from 'react-social-icons';
import { getProfileByID, getProfile, getOwnReservations } from '../../../redux/actions';
import { Comments, Like, Dislike, Rating, TabComponent, Banner } from '../..';
import { profileTabItems } from './profileTabItems';
import EditProfile from './EditProfile';
import './profile.scss';

function Profile({ match }) {
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
  const [isEditPageVisible, setIsEditPageVisible] = React.useState(false);

  React.useEffect(() => {
    const updateProfile = () => {
      if (user) {
        dispatch(getOwnReservations());
        if (match.params.profileID === 'me' || user._id === match.params.profileID) {
          dispatch(getProfile());
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
  }, [dispatch, user, match]);

  const onEditIconClick = React.useCallback(() => {
    setIsEditPageVisible(true);
  }, [setIsEditPageVisible]);

  if (isEditPageVisible) {
    return <EditProfile isEditPageVisible={isEditPageVisible} profile={currentProfile} />;
  }

  console.log(currentProfile);

  return (
    <div>
      {!currentProfile && isOwnPage && (
        <Banner title="Need to create a Profile">
          <Link to="/create-profile" className="primary-button">
            Create Profile
          </Link>
        </Banner>
      )}
      {!isOwnPage && <React.Fragment>Profile</React.Fragment>}
      {isOwnPage && currentProfile && <React.Fragment>My profile</React.Fragment>}
      {currentProfile && (
        <div>
          <div>{currentProfile.isOnline ? 'Online' : 'Offline'}</div>
          <div>{`${currentProfile.user.firstName} ${currentProfile.user.lastName}`}</div>
          <Avatar src={currentProfile.photo === 'default' ? '' : currentProfile.photo} />
          {isOwnPage && <Edit className="cursor" onClick={onEditIconClick} />}
          {currentProfile.social &&
            Object.keys(currentProfile.social).map((key, index) => (
              <SocialIcon
                url={currentProfile.social[key]}
                key={`${currentProfile.social[key]}_${index}`}
              />
            ))}
          {currentProfile.contactNumber && (
            <div>Contact Number: {currentProfile.contactNumber}</div>
          )}
          <TabComponent
            tabItems={
              user
                ? profileTabItems(
                    currentProfile.user._id,
                    profile,
                    renters,
                    estates.filter(({ visible }) => visible),
                    reservations.map(({ estate }) => estate),
                  ).filter(({ ownerID }) => !ownerID || ownerID === user._id)
                : profileTabItems(currentProfile.user._id, profile).filter(
                    ({ ownerID }) => !ownerID,
                  )
            }
          />
          <Rating
            authUserID={user ? user._id : ''}
            collectionID={match.params.profileID}
            label="profile"
            ratingValue={currentProfile.totalRating}
            isClickable={!!profile}
            pageType="single"
          />
          <Like
            likeType="profile"
            pageType="single"
            collectionID={match.params.profileID === 'me' ? user._id : match.params.profileID}
            amountOflikes={currentProfile.amountOflikes}
            isActive={user ? currentProfile.likes.includes(user._id) : false}
            isClickable={!!profile}
          />
          <Dislike
            dislikeType="profile"
            pageType="single"
            collectionID={
              user ? (match.params.profileID === 'me' ? user._id : match.params.profileID) : ''
            }
            amountOfDislikes={currentProfile.amountOfdislikes}
            isActive={user ? currentProfile.dislikes.includes(user._id) : false}
            isClickable={!!profile}
          />
          <Comments
            comments={currentProfile.comments}
            label="profile"
            collectionID={match.params.profileID === 'me' ? user._id : match.params.profileID}
            ownerID={currentProfile.user._id}
            userCanComment={!!profile}
          />
        </div>
      )}
    </div>
  );
}

Profile.propTypes = {
  match: PropTypes.object.isRequired,
};

export default React.memo(withRouter(Profile));
