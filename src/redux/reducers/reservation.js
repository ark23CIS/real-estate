import { DELETE_RESERVATION, GET_RESERVATION, GET_RESERVATIONS } from '../actions/types';

const initState = {
  reservations: [],
};

export default function (state = initState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_RESERVATION:
      return { ...state, reservations: [...state.reservations, payload] };
    case GET_RESERVATIONS:
      return { ...state, reservations: payload };
    case DELETE_RESERVATION:
      return {
        ...state,
        reservations: state.reservations.filter((reservation) => reservation._id !== payload._id),
      };
    default:
      return state;
  }
}
