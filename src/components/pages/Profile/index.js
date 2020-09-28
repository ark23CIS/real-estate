import React from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Avatar } from '@material-ui/core';
import PropTypes from 'prop-types';
import { SocialIcon } from 'react-social-icons';
import Banner from '../../Banner';
import { getProfileByID, getProfile } from '../../../redux/actions';
import { Comments, Like, Dislike, Rating, TabComponent } from '../..';
import { profileTabItems } from './profileTabItems';
import './profile.scss';

function Profile({ match }) {
  const {
    auth,
    profile: { profile },
  } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [isOwnPage, setIsOwnPage] = React.useState(false);

  React.useEffect(() => {
    const updateProfile = () => {
      if (
        match.params.profileID === 'me' ||
        (auth.user && auth.user._id === match.params.profileID)
      ) {
        dispatch(getProfile());
        setIsOwnPage(true);
      } else {
        dispatch(getProfileByID(match.params.profileID));
        console.log();
        setIsOwnPage(false);
      }
    };
    updateProfile();
    const interval = setInterval(updateProfile, 30000);
    return () => clearInterval(interval);
  }, [dispatch, auth, match]);

  return (
    <div>
      {!profile && isOwnPage && (
        <Banner title="Need to create a Profile">
          <Link to="/create-profile" className="primary-button">
            Create Profile
          </Link>
        </Banner>
      )}
      {!isOwnPage && <React.Fragment>Profile</React.Fragment>}
      {isOwnPage && profile && <React.Fragment>My profile</React.Fragment>}
      {profile && (
        <div>
          <div>{profile.isOnline ? 'Online' : 'Offline'}</div>
          <div>{`${profile.user.firstName} ${profile.user.lastName}`}</div>
          <Avatar src={profile.photo === 'default' ? '' : profile.photo} />
          {profile.social &&
            Object.keys(profile.social).map((key, index) => (
              <SocialIcon url={profile.social[key]} key={`${profile.social[key]}_${index}`} />
            ))}
          <div>Contact Number: {profile.contactNumber}</div>
          <TabComponent tabItems={profileTabItems} />
          <Rating
            authUserID={auth.user._id || ''}
            collectionID={match.params.profileID}
            label="profile"
          />
          <Like
            likeType="profile"
            collectionID={match.params.profileID === 'me' ? auth.user._id : match.params.profileID}
            amountOflikes={profile.amountOflikes}
            isActive={profile.likes.includes(profile.user._id)}
          />
          <Dislike
            dislikeType="profile"
            collectionID={match.params.profileID === 'me' ? auth.user._id : match.params.profileID}
            amountOfDislikes={profile.amountOfdislikes}
            isActive={profile.dislikes.includes(profile.user._id)}
          />
          <Comments
            comments={profile.comments}
            collectionID={match.params.profileID === 'me' ? auth.user._id : match.params.profileID}
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
