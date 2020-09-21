import React, { Fragment } from "react";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Banner from "../../Banner";
import PropTypes from "prop-types";
import { Rating } from "../../index";
import {
  getProfileByID,
  getProfile,
  likeProfile,
  dislikeProfile,
} from "../../../redux/actions";
import { ThumbDown, ThumbUp } from "@material-ui/icons";
import "./profile.scss";

function Profile({ match, history }) {
  console.log(history);
  const {
    auth,
    profile: { profile, profiles },
  } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [isOwnPage, setIsOwnPage] = React.useState(false);

  React.useEffect(() => {
    if (
      match.params.profileID === "me" ||
      (auth.user && auth.user._id === match.params.profileID)
    ) {
      dispatch(getProfile());
      setIsOwnPage(true);
    } else {
      dispatch(getProfileByID(match.params.profileID));
      setIsOwnPage(false);
    }
  }, [dispatch, auth]);

  const onLike = React.useCallback(() => {
    if (auth.user && auth.user._id) {
      dispatch(
        likeProfile(
          match.params.profileID === "me"
            ? auth.user._id
            : match.params.profileID
        )
      );
    }
  }, [dispatch]);

  const onDislike = React.useCallback(() => {
    if (auth.user && auth.user._id) {
      dispatch(
        dislikeProfile(
          match.params.profileID === "me"
            ? auth.user._id
            : match.params.profileID
        )
      );
    }
  }, [dispatch]);

  if (auth.user && auth) {
    console.log(match.params.profileID, auth.user._id);
    console.log(isOwnPage);
  }

  return (
    <div>
      {!profile && isOwnPage && (
        <Banner title="Need to create a Profile">
          <Link to="/create-profile" className="primary-button">
            Create Profile
          </Link>
        </Banner>
      )}
      {!isOwnPage && <Fragment>Profile</Fragment>}
      {isOwnPage && profile && <Fragment>My profile</Fragment>}
      {profile && (
        <div>
          <Rating authUserID={auth.user._id || null} />
          <ThumbDown className="cursor" onClick={onDislike} />
          <ThumbUp className="cursor" onClick={onLike} />
        </div>
      )}
    </div>
  );
}

Profile.propTypes = {
  match: PropTypes.object,
  history: PropTypes.object,
};

export default React.memo(withRouter(Profile));
