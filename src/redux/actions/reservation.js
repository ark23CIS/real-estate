import axios from 'axios';
import { GET_RESERVATION, GET_RESERVATIONS, DELETE_RESERVATION } from './types';
import { configContentType } from '../helpers';

export const createReservation = (
  ownerProfileID,
  possibleClientProfileID,
  estateID,
  history,
) => async (dispatch) => {
  try {
    const res = await axios.post(
      '/api/reservations',
      { owner: ownerProfileID, possibleClient: possibleClientProfileID, estate: estateID },
      configContentType(),
    );
    dispatch({ type: GET_RESERVATION, payload: res.data });
    history.push('/offers');
  } catch (err) {
    console.log(err.message);
  }
};

export const updateReservation = (status, reservationID) => async (dispatch) => {
  try {
    await axios.put('/api/reservations', { status, reservationID }, configContentType());
    dispatch(getOwnReservations());
  } catch (err) {
    console.log(err.message);
  }
};

export const getOwnReservations = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/reservations/me');
    dispatch({ type: GET_RESERVATIONS, payload: res.data });
  } catch (err) {
    console.log(err.message);
  }
};

export const deleteReservation = (reservationID) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/reservations/${reservationID}`);
    dispatch({ type: DELETE_RESERVATION, payload: res.data });
  } catch (err) {
    console.log(err.message);
  }
};
