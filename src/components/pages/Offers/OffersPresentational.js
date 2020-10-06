import React from 'react';
import { Link } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import { Block, Banner } from '../..';

function OffersPresentational({ reservations, classes, renderActions }) {
  return (
    <div>
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
    </div>
  );
}

OffersPresentational.propTypes = {
  reservations: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  renderActions: PropTypes.func.isRequired,
};

export default OffersPresentational;
