import React from 'react';
import { Link } from 'react-router-dom';
import { Avatar } from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import PropTypes from 'prop-types';
import { SocialIcon } from 'react-social-icons';
import { Comments, Like, Dislike, Rating, TabComponent, Banner } from '../..';
import { profileTabItems } from './profileTabItems';

function ProfilePresentational({
  currentProfile,
  isOwnPage,
  onDeleteProfile,
  profile,
  renters,
  estates,
  reservations,
  user,
  match,
}) {
  return (
    <div>
      {!currentProfile && isOwnPage && (
        <Banner title="Need to create a Profile">
          <Link to="/create-profile" className="primary-button">
            Create Profile
          </Link>
        </Banner>
      )}
      {!currentProfile && !isOwnPage && (
        <Banner title="No profile" subtitle="The profile does not exist or it has been removed">
          <Link to="/search" className="primary-button">
            Search ads
          </Link>
        </Banner>
      )}
      {currentProfile && (
        <div className="profile">
          <div className="profile__main-info">
            <div className="profile__status">{currentProfile.isOnline ? 'Online' : 'Offline'}</div>

            <Avatar
              src={currentProfile.photo === 'default' ? '' : currentProfile.photo}
              style={{ height: '200px', width: '200px' }}
            />
            <div className="profile__fullname-and-delete">
              {isOwnPage && <Delete className="cursor" onClick={onDeleteProfile} />}

              <div className="profile__fullname">{`${currentProfile.user.firstName} ${currentProfile.user.lastName}`}</div>
            </div>
            <div className="profile__joined">
              {`Joined ${new Date(currentProfile.user.dateOfRegistration).toDateString()}`}
            </div>
          </div>
          <div className="profile__info">
            {currentProfile.social && (
              <div className="profile__socials">
                {Object.keys(currentProfile.social).map((key, index) => (
                  <SocialIcon
                    url={currentProfile.social[key]}
                    key={`${currentProfile.social[key]}_${index}`}
                  />
                ))}
              </div>
            )}
            {currentProfile.contactNumber && (
              <div>Contact Number : {currentProfile.contactNumber}</div>
            )}
            <div>Email : {currentProfile.user.email}</div>
          </div>
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
          <div className="profile__estimations">
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
              collectionID={
                user ? (match.params.profileID === 'me' ? user._id : match.params.profileID) : ''
              }
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
          </div>

          <Comments
            comments={currentProfile.comments}
            label="profile"
            collectionID={
              user ? (match.params.profileID === 'me' ? user._id : match.params.profileID) : ''
            }
            ownerID={currentProfile.user._id}
            userCanComment={!!profile}
          />
        </div>
      )}
    </div>
  );
}

ProfilePresentational.propTypes = {
  currentProfile: PropTypes.object.isRequired,
  isOwnPage: PropTypes.bool.isRequired,
  onDeleteProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  renters: PropTypes.arrayOf(PropTypes.object).isRequired,
  estates: PropTypes.arrayOf(PropTypes.object).isRequired,
  reservations: PropTypes.arrayOf(PropTypes.object).isRequired,
  user: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
};

export default ProfilePresentational;
