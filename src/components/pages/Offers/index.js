import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Check, DoneAll, Cancel, Timer, Delete, Error } from '@material-ui/icons';
import useStyles from './offersStyles';
import OffersPresentational from './OffersPresentational';
import { getOwnReservations, updateReservation, deleteReservation } from '../../../redux/actions';

export default function OffersContainer() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const {
    reservation: { reservations },
    auth: { user },
  } = useSelector((state) => state);

  React.useEffect(() => {
    dispatch(getOwnReservations());
  }, [dispatch]);

  const onUpdate = React.useCallback(
    (status, reservationID) => {
      dispatch(updateReservation(status, reservationID));
    },
    [dispatch],
  );

  const onDelete = React.useCallback(
    (reservationID) => {
      dispatch(deleteReservation(reservationID));
    },
    [dispatch],
  );

  const renderActions = React.useCallback(
    (reservation) => {
      if (reservation.owner)
        if (reservation.owner._id === user._id)
          return (
            <React.Fragment>
              {reservation.status === 'pending' && (
                <div>
                  <Check
                    className="cursor"
                    style={{ color: 'green' }}
                    onClick={() => onUpdate('accepted', reservation._id)}
                  />
                  <Cancel
                    className="cursor"
                    style={{ color: 'black' }}
                    onClick={() => onUpdate('aborted', reservation._id)}
                  />
                </div>
              )}
              {reservation.status === 'accepted' && (
                <DoneAll className="cursor" style={{ color: 'green' }} />
              )}
              {reservation.status === 'aborted' && (
                <Error className="cursor" style={{ color: 'red' }} />
              )}
            </React.Fragment>
          );
        else
          return (
            <React.Fragment>
              {reservation.status === 'pending' && (
                <React.Fragment>
                  <Timer className="cursor" />
                  <Delete
                    className="cursor"
                    style={{ color: 'black' }}
                    onClick={() => onDelete(reservation._id)}
                  />
                </React.Fragment>
              )}
              {reservation.status === 'accepted' && (
                <DoneAll className="cursor" style={{ color: 'green' }} />
              )}
              {reservation.status === 'aborted' && (
                <Error className="cursor" style={{ color: 'red' }} />
              )}
            </React.Fragment>
          );
    },
    [user],
  );

  return (
    <OffersPresentational
      reservations={reservations}
      classes={classes}
      renderActions={renderActions}
    />
  );
}
