import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Check, DoneAll, Cancel, Timer, Delete, Error } from '@material-ui/icons';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@material-ui/core';
import useStyles from './offersStyles';
import { Block, Banner } from '../..';
import { getOwnReservations, updateReservation, deleteReservation } from '../../../redux/actions';

export default function DenseTable() {
  const classes = useStyles();
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
    <React.Fragment>
      {reservations &&
        reservations.map((reservation) => (
          <Block>
            <TableContainer component={Paper}>
              <Table className={classes.table} size="small" aria-label="a dense table">
                <TableHead>
                  <TableRow>
                    <TableCell>Estate</TableCell>
                    <TableCell align="right">Owner</TableCell>
                    <TableCell align="right">Client</TableCell>
                    <TableCell align="right">Status</TableCell>
                    <TableCell align="right">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <Link to={`/estates/${reservation.estate ? reservation.estate._id : ''}`}>
                        {reservation.estate ? reservation.estate.title : ''}
                      </Link>
                    </TableCell>
                    <TableCell align="right">
                      <Link to={`/profiles/${reservation.owner ? reservation.owner._id : ''}`}>{`${
                        reservation.owner ? reservation.owner.firstName : ''
                      } ${reservation.owner ? reservation.owner.lastName : ''}`}</Link>
                    </TableCell>
                    <TableCell align="right">
                      <Link
                        to={`/profiles/${
                          reservation.possibleClient ? reservation.possibleClient._id : ''
                        }`}
                      >{`${
                        reservation.possibleClient ? reservation.possibleClient.firstName : ''
                      } ${
                        reservation.possibleClient ? reservation.possibleClient.lastName : ''
                      }`}</Link>
                    </TableCell>
                    <TableCell align="right" style={{ textTransform: 'capitalize' }}>
                      {reservation.status}
                    </TableCell>
                    <TableCell align="right">{renderActions(reservation)}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Block>
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
    </React.Fragment>
  );
}
