import React, { Fragment } from "react";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Banner from "../../Banner";
import { Rating } from "../../index";
import {
  getProfileByID,
  getProfile,
  like,
  dislike,
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
        like(
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
        dislike(
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
        <Banner title="Need to create Profile">
          <Link to="/create-profile" className="primary-button">
            Create Profile
          </Link>
        </Banner>
      )}
      {!isOwnPage && <Fragment>Profile</Fragment>}
      {isOwnPage && profile && <Fragment>My profile</Fragment>}
      {profile && (
        <div>
          <Rating />
          <ThumbDown onClick={onDislike} />
          <ThumbUp onClick={onLike} />
        </div>
      )}
    </div>
  );
}

export default withRouter(React.memo(Profile));
