import React from 'react';
import { Link } from 'react-router-dom';
import Slider from '../../Slider';
import { Comments, Rating, Like, Dislike, Views, Banner, DeletePage } from '../..';
import PropTypes from 'prop-types';
import '../SingleEstate/ad.scss';

function SingleRenterPresentational({ onDeleteRenter, renter, renterID, profile, user }) {
  return (
    <div>
      {renter && (
        <div className="ad">
          <Slider photoLinks={renter.photos} />
          <div className="single-ad-data">
            <div className="ad__details">
              <h3>{renter.title}</h3>
              <div className="ad__details-content">{renter.text}</div>
            </div>
            <div className="ad__info">
              <h3>info</h3>
              <div>Phone to contact : {renter.contactNumber}</div>
              <div>Max Price : {renter.maxPrice}$</div>
              <div>Preferred Footage : {renter.footage} squared meters</div>
              <div>Preferred Region : {renter.region}</div>
              <div>Created at : {new Date(renter.created).toDateString()}</div>
              <div>
                Author:{' '}
                <Link to={`/profiles/${renter.user ? renter.user._id : ''}`}>{`${
                  renter.user ? renter.user.firstName : ''
                } ${renter.user ? renter.user.lastName : ''}`}</Link>
              </div>
            </div>
            <div className="ad__estimations">
              <Like
                likeType="renter"
                collectionID={renterID}
                amountOflikes={renter.amountOflikes}
                isActive={user && renter.likes ? renter.likes.includes(user._id) : false}
                isClickable={!!profile}
                pageType="single"
              />
              <Dislike
                collectionID={renterID}
                amountOfDislikes={renter.amountOfdislikes}
                dislikeType="renter"
                isActive={user && renter.dislikes ? renter.dislikes.includes(user._id) : false}
                isClickable={!!profile}
                pageType="single"
              />
              <Views amountOfViews={renter.totalViews} />
              <Rating
                label="renter"
                collectionID={renterID}
                ratingValue={renter.totalRating}
                isClickable={!!profile}
                pageType="single"
              />
              {renter.user && user && renter.user._id === user._id && (
                <DeletePage onDelete={() => onDeleteRenter(renterID)} />
              )}
            </div>
          </div>
          <div className="comments">
            <Comments
              comments={renter.comments}
              label="renter"
              collectionID={renterID}
              ownerID={renter.user ? renter.user._id : ''}
              userCanComment={!!profile}
            />
          </div>
        </div>
      )}
      {!renter && (
        <Banner
          title="The renter does not exist"
          subtitle="The renter wasnt found"
          children={
            <Link to="/search">
              <button className="primary-button">Go back</button>
            </Link>
          }
        />
      )}
    </div>
  );
}

SingleRenterPresentational.propTypes = {
  onDeleteRenter: PropTypes.func.isRequired,
  renter: PropTypes.object.isRequired,
  renterID: PropTypes.string.isRequired,
  profile: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
};

export default SingleRenterPresentational;
