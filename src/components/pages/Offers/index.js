import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Check, DoneAll, Cancel, Timer, Delete, Error } from '@material-ui/icons';
import { Banner } from '../..';
import { getOwnReservations, updateReservation, deleteReservation } from '../../../redux/actions';

function index() {
  const dispatch = useDispatch();
  const {
    reservation: { reservations },
    auth: { user },
  } = useSelector((state) => state);

  React.useEffect(() => {
    dispatch(getOwnReservations());
  }, [dispatch]);

  console.log(reservations);

  const onUpdate = React.useCallback(
    (status, reservationID) => {
      dispatch(updateReservation(status, reservationID));
    },
    [dispatch],
  );

  const onDelete = React.useCallback(
    (reservationID) => {
      console.log(reservationID);
      dispatch(deleteReservation(reservationID));
    },
    [dispatch],
  );

  console.log(reservations);
  return (
    <div>
      {reservations &&
        reservations.map((reservation) => (
          <React.Fragment>
            <div>
              <Link
                to={`${reservation.possibleClient._id}`}
              >{`${reservation.possibleClient.firstName} ${reservation.possibleClient.lastName}`}</Link>
              {` want${reservation.status === 'pending' ? 's' : 'ed'} to rent `}
              <Link to={`/estates/${reservation.estate._id}`}>the following estate</Link>
              {' asks'}
              <Link> {`${reservation.owner.firstName} ${reservation.owner.lastName}`}</Link>
              {' to confirm'}
            </div>
            <div key={`${reservation.owner._id}_${reservation.possibleClient._id}_${index}`}>
              {reservation.status}
            </div>
            {reservation.owner._id === user._id ? (
              <React.Fragment>
                {reservation.status === 'pending' && (
                  <div>
                    <Check
                      className="cursor"
                      onClick={() => onUpdate('accepted', reservation._id)}
                    />
                    <Cancel
                      className="cursor"
                      onClick={() => onUpdate('aborted', reservation._id)}
                    />
                  </div>
                )}
                {reservation.status === 'accepted' && <DoneAll className="cursor" />}
                {reservation.status === 'aborted' && <Error className="cursor" />}
              </React.Fragment>
            ) : (
              <div>
                {reservation.status === 'pending' && (
                  <React.Fragment>
                    <Timer className="cursor" />
                    <Delete className="cursor" onClick={() => onDelete(reservation._id)} />
                  </React.Fragment>
                )}
                {reservation.status === 'accepted' && <DoneAll className="cursor" />}
                {reservation.status === 'aborted' && <Error className="cursor" />}
              </div>
            )}
          </React.Fragment>
        ))}
      {!reservations.length && (
        <Banner
          title="No reservations"
          subtitle="You have no reservations"
          children={
            <Link to="/search">
              <button className="primary-button">Rent some</button>
            </Link>
          }
        />
      )}
    </div>
  );
}

export default index;
