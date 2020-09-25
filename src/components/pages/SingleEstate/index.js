import React, { Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getEstateByID } from "../../../redux/actions";
import { withRouter } from "react-router";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Slider from "../../Slider";
import { Comments } from "../..";
import "./single-estate.scss";

function index({ match }) {
  const dispatch = useDispatch();
  const { estate } = useSelector((state) => state.estate);
  const estateID = match.params.estateID;
  React.useEffect(() => {
    if (estateID) dispatch(getEstateByID(estateID));
  }, [dispatch, estateID]);
  console.log(estate);
  return (
    <Fragment>
      {estate && (
        <Fragment>
          <div className="mu-block">
            <Slider photoLinks={estate.photos} />
          </div>
          <div>{estate.title}</div>
          <div>{estate.text}</div>
          <div>Total views: {estate.totalViews}</div>
          <div>Users watched times: {estate.amountOfusersWatched}</div>
          <div>Phone to contact: {estate.contactNumber}</div>
          <div>Price: {estate.price}$</div>
          <div>Footage: {estate.footage} squared meters</div>
          Address
          <div>Country: {estate.estateAddress.country}</div>
          <div>City: {estate.estateAddress.city}</div>
          <div>Region: {estate.region}</div>
          <div>Street: {estate.estateAddress.street}</div>
          <div>Building Number: {estate.estateAddress.buildingNumber}</div>
          <div>Created at: {estate.created}</div>
          <div>Total Star Rating: {estate.totalRating}</div>
          <div>
            Author:{" "}
            <Link
              to={`/profiles/${estate.user._id}`}
            >{`${estate.user.firstName} ${estate.user.lastName}`}</Link>
          </div>
          <Comments comments={estate.comments} />
        </Fragment>
      )}
    </Fragment>
  );
}

index.propTypes = {
  match: PropTypes.object,
};

export default React.memo(withRouter(index));
