import React from 'react';
import { Link } from 'react-router-dom';
import { Delete } from '@material-ui/icons';
import Slider from '../../Slider';
import { Comments, Rating, Like, Dislike, Views, Banner } from '../..';
import PropTypes from 'prop-types';
import './ad.scss';

function SingleEstatePresentational({
  estate,
  reservatedByMe,
  profile,
  user,
  estateID,
  onReservateClick,
  onDeleteEstate,
}) {
  return (
    <div>
      {estate && (estate.visible || reservatedByMe) && (
        <div className="ad">
          <Slider photoLinks={estate.photos} />
          <div className="single-ad-data">
            <div className="ad__details">
              <h3>{estate.title}</h3>
              <div className="ad__details-content">{estate.text}</div>
            </div>
            <div className="ad__info">
              <h3>info</h3>
              <div>Phone to contact : {estate.contactNumber}</div>
              <div>Price : {estate.price}$</div>
              <div>Footage : {estate.footage} squared meters</div>
              <div>Created at : {new Date(estate.created).toDateString()}</div>
              <div>
                Author :{' '}
                <Link to={`/profiles/${estate.user ? estate.user._id : ''}`}>{`${
                  estate.user ? estate.user.firstName : 'Deleted'
                } ${estate.user ? estate.user.lastName : ''}`}</Link>
              </div>
              <div className="ad__info-address">
                <h3>Address</h3>
                <div className="ad__info-address-content">
                  <div>{`${estate.estateAddress.country}, ${estate.estateAddress.city}, ${estate.region}, ${estate.estateAddress.street}, ${estate.estateAddress.buildingNumber}`}</div>
                </div>
              </div>
            </div>
            <div className="ad__estimations">
              <Like
                likeType="estate"
                collectionID={estateID}
                amountOflikes={estate.amountOflikes}
                isActive={user ? estate.likes.includes(user._id) : false}
                isClickable={!!profile}
                pageType="single"
                pageOwnerID={estate._id}
              />
              <Dislike
                collectionID={estateID}
                amountOfDislikes={estate.amountOfdislikes}
                dislikeType="estate"
                isActive={user ? estate.dislikes.includes(user._id) : false}
                isClickable={!!profile}
                pageType="single"
                pageOwnerID={estate._id}
              />
              <Views amountOfViews={estate.totalViews} />
              <Rating
                label="estate"
                collectionID={estateID}
                isClickable={!!profile}
                ratingValue={estate.totalRating}
                pageType="single"
                pageOwnerID={estate._id}
              />
              {estate.user && user && estate.user._id === user._id && (
                <Delete className="cursor" onClick={() => onDeleteEstate(estate._id)} />
              )}
            </div>
          </div>

          {profile && estate.user && estate.user._id !== profile.user._id && !reservatedByMe && (
            <div className="primary-button" onClick={onReservateClick}>
              Reservate
            </div>
          )}
          {reservatedByMe && <div className="reservated">This page was reservated by you</div>}
          <div className="comments">
            <Comments
              comments={estate.comments}
              label="estate"
              collectionID={estateID}
              ownerID={estate.user ? estate.user._id : ''}
              userCanComment={!!profile}
            />
          </div>
        </div>
      )}
      {!estate ||
        (!estate.visible && !reservatedByMe && (
          <Banner
            title="The estate is not found"
            subtitle="The estate is not found or it has been already rented"
            children={
              <Link to="/search">
                <button className="primary-button">Go back</button>
              </Link>
            }
          />
        ))}
    </div>
  );
}

SingleEstatePresentational.propTypes = {
  estate: PropTypes.object.isRequired,
  reservatedByMe: PropTypes.bool.isRequired,
  profile: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  estateID: PropTypes.string.isRequired,
  onDeleteEstate: PropTypes.func.isRequired,
  onReservateClick: PropTypes.func.isRequired,
};

export default SingleEstatePresentational;
