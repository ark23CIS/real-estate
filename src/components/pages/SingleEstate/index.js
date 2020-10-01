import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getEstateByID, createReservation, getOwnReservations } from '../../../redux/actions';
import Slider from '../../Slider';
import { Comments, Rating, Like, Dislike, Views, Banner } from '../..';

function SingleEstate({ match, history }) {
  const dispatch = useDispatch();
  const {
    estate: { estate },
    auth: { user },
    profile: { profile },
    reservation: { reservations },
  } = useSelector((state) => state);

  const estateID = match.params.estateID;
  let reservatedByMe = false;

  React.useEffect(() => {
    if (estateID) {
      dispatch(getEstateByID(estateID));
      dispatch(getOwnReservations());
    }
  }, [dispatch, estateID]);

  const onReservateClick = React.useCallback(() => {
    dispatch(createReservation(estate.user._id, profile.user._id, estate._id, history));
  }, [dispatch, estate, profile]);

  if (reservations) {
    reservatedByMe = reservations
      .filter(({ status }) => status === 'accepted')
      .map(({ estate }) => estate._id)
      .includes(estateID);
  }

  return (
    <React.Fragment>
      {estate && (estate.visible || reservatedByMe) && (
        <React.Fragment>
          <Slider photoLinks={estate.photos} />
          <div>{estate.title}</div>
          <div>{estate.text}</div>
          <div>Users watched: {estate.amountOfusersWatched}</div>
          <div>Phone to contact: {estate.contactNumber}</div>
          <div>Price: {estate.price}$</div>
          <div>Footage: {estate.footage} squared meters</div>
          Address
          <div>Country: {estate.estateAddress.country}</div>
          <div>City: {estate.estateAddress.city}</div>
          <div>Region: {estate.region}</div>
          <div>Street: {estate.estateAddress.street}</div>
          <div>Building Number: {estate.estateAddress.buildingNumber}</div>
          <div>Created at: {new Date(estate.created).toDateString()}</div>
          <Like
            likeType="renter"
            collectionID={estateID}
            amountOflikes={estate.amountOflikes}
            isActive={user ? estate.likes.includes(user._id) : false}
            isClickable={!!profile}
          />
          <Dislike
            collectionID={estateID}
            amountOfDislikes={estate.amountOfdislikes}
            dislikeType="renter"
            isActive={user ? estate.dislikes.includes(user._id) : false}
            isClickable={!!profile}
          />
          <Views amountOfViews={estate.totalViews} />
          <div>Total Star Rating: {estate.totalRating}</div>
          <Rating
            label="estate"
            collectionID={estateID}
            isClickable={!!profile}
            ratingValue={estate.totalRating}
          />
          <div>
            Author:{' '}
            <Link
              to={`/profiles/${estate.user._id}`}
            >{`${estate.user.firstName} ${estate.user.lastName}`}</Link>
          </div>
          {profile && estate.user._id !== profile.user._id && !reservatedByMe && (
            <div className="primary-button" onClick={onReservateClick}>
              Reservate
            </div>
          )}
          <Comments
            comments={estate.comments}
            label="estate"
            collectionID={estateID}
            ownerID={estate.user._id}
            userCanComment={!!profile}
          />
        </React.Fragment>
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
    </React.Fragment>
  );
}

SingleEstate.propTypes = {
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default React.memo(withRouter(SingleEstate));
