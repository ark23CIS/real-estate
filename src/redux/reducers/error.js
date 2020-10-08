import { ADD_ERROR, ADD_ERRORS, REMOVE_ERROR, REMOVE_ERRORS } from '../actions/types';

const initState = [];

export default function (state = initState, action) {
  const { type, payload } = action;
  switch (type) {
    case ADD_ERROR:
      return [...state, payload];
    case REMOVE_ERROR:
      return state.filter((error) => error.id !== payload);
    case ADD_ERRORS:
      return [...payload];
    case REMOVE_ERRORS:
      return [];
    default:
      return state;
  }
}
