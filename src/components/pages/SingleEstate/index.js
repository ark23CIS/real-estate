import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getEstateByID } from '../../../redux/actions';
import Slider from '../../Slider';
import { Comments, Rating, Like, Dislike } from '../..';

function SingleEstate({ match }) {
  const dispatch = useDispatch();
  const {
    estate: { estate },
    auth: { user },
  } = useSelector((state) => state);

  const estateID = match.params.estateID;

  React.useEffect(() => {
    if (estateID) dispatch(getEstateByID(estateID));
  }, [dispatch, estateID]);

  return (
    <React.Fragment>
      {estate && (
        <Fragment>
          <div className="mu-block">
            <Slider photoLinks={estate.photos} />
          </div>
          <div>{estate.title}</div>
          <div>{estate.text}</div>
          <div>Total views: {estate.totalViews}</div>
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
            isActive={estate.likes.includes(user._id)}
          />
          <Dislike
            collectionID={estateID}
            amountOfDislikes={estate.amountOfdislikes}
            dislikeType="renter"
            isActive={estate.dislikes.includes(user._id)}
          />
          <div>Total Star Rating: {estate.totalRating}</div>
          <Rating label="estate" collectionID={estateID} />
          <div>
            Author:{' '}
            <Link
              to={`/profiles/${estate.user._id}`}
            >{`${estate.user.firstName} ${estate.user.lastName}`}</Link>
          </div>
          <Comments comments={estate.comments} label="estate" collectionID={estateID} />
        </Fragment>
      )}
    </React.Fragment>
  );
}

SingleEstate.propTypes = {
  match: PropTypes.object.isRequired,
};

export default React.memo(withRouter(SingleEstate));
