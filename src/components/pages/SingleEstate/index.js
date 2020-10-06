import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import {
  getEstateByID,
  createReservation,
  getOwnReservations,
  deleteEstate,
} from '../../../redux/actions';
import SingleEstatePresentational from './SingleEstatePresentational';
import './ad.scss';

function SingleEstateContainer({ match, history }) {
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

  const onDeleteEstate = React.useCallback(
    (estateID) => {
      if (estateID) dispatch(deleteEstate(estateID, history));
    },
    [dispatch],
  );

  if (reservations) {
    reservatedByMe = reservations
      .filter(({ status }) => status === 'accepted')
      .map(({ estate }) => estate._id)
      .includes(estateID);
  }

  return (
    <SingleEstatePresentational
      profile={profile}
      estate={estate}
      reservatedByMe={reservatedByMe}
      estateID={estateID}
      user={user}
      onDeleteEstate={onDeleteEstate}
      onReservateClick={onReservateClick}
    />
  );
}

SingleEstateContainer.propTypes = {
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default React.memo(withRouter(SingleEstateContainer));
