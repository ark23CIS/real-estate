import React, { Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getRenterByID } from "../../../redux/actions";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import Slider from "../../Slider";
import PropTypes from "prop-types";
import { Comments } from "../..";

function index({ match }) {
  const dispatch = useDispatch();
  const { renter } = useSelector((state) => state.renter);
  const renterID = match.params.renterID;
  React.useEffect(() => {
    if (renterID) dispatch(getRenterByID(renterID));
  }, [dispatch, renterID]);
  console.log(renter);
  return (
    <div className="mu-block">
      {renter && (
        <Fragment>
          <Slider photoLinks={renter.photos} />
          <div>{renter.title}</div>
          <div>{renter.text}</div>
          <div>Total views: {renter.totalViews}</div>
          <div>Users watched times: {renter.amountOfusersWatched}</div>
          <div>Phone to contact: {renter.contactNumber}</div>
          <div>Max Price: {renter.maxPrice}$</div>
          <div>Preferred Footage: {renter.footage} squared meters</div>
          <div>Preferred Region: {renter.region}</div>
          <div>Created at: {renter.created}</div>
          <div>Total Star Rating: {renter.totalRating}</div>
          <div>
            Author:{" "}
            <Link
              to={`/profiles/${renter.user._id}`}
            >{`${renter.user.firstName} ${renter.user.lastName}`}</Link>
          </div>
          <Comments comments={[]} />
        </Fragment>
      )}
    </div>
  );
}

index.propTypes = {
  match: PropTypes.object,
};

export default React.memo(withRouter(index));
