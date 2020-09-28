import React, { Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { getRenterByID } from '../../../redux/actions';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import Slider from '../../Slider';
import { Comments, Rating, Like, Dislike } from '../..';

function SingleRenter({ match }) {
  const dispatch = useDispatch();
  const {
    renter: { renter },
    auth: { user },
  } = useSelector((state) => state);
  const renterID = match.params.renterID;

  React.useEffect(() => {
    if (renterID) dispatch(getRenterByID(renterID));
  }, [dispatch, renterID]);

  return (
    <div>
      {renter && (
        <Fragment>
          <Slider photoLinks={renter.photos} />
          <div>{renter.title}</div>
          <div>{renter.text}</div>
          <div>Total views: {renter.totalViews}</div>
          <div>Users watched: {renter.amountOfusersWatched}</div>
          <div>Phone to contact: {renter.contactNumber}</div>
          <div>Max Price: {renter.maxPrice}$</div>
          <div>Preferred Footage: {renter.footage} squared meters</div>
          <div>Preferred Region: {renter.region}</div>
          <div>Created at: {new Date(renter.created).toDateString()}</div>
          <Like
            likeType="renter"
            collectionID={renterID}
            amountOflikes={renter.amountOflikes}
            isActive={renter.likes.includes(user._id)}
          />
          <Dislike
            collectionID={renterID}
            amountOfDislikes={renter.amountOfdislikes}
            dislikeType="renter"
            isActive={renter.dislikes.includes(user._id)}
          />
          <div>Total Star Rating: {renter.totalRating}</div>
          <Rating label="renter" collectionID={renterID} />
          <div>
            Author:{' '}
            <Link
              to={`/profiles/${renter.user._id}`}
            >{`${renter.user.firstName} ${renter.user.lastName}`}</Link>
          </div>
          <Comments comments={renter.comments} label="renter" collectionID={renterID} />
        </Fragment>
      )}
    </div>
  );
}

SingleRenter.propTypes = {
  match: PropTypes.object.isRequired,
};

export default React.memo(withRouter(SingleRenter));
