import { ADD_SUCCESS, REMOVE_SUCCESSES, REMOVE_SUCCESS } from '../actions/types';

const initState = [];

export default function (state = initState, action) {
  const { type, payload } = action;
  switch (type) {
    case ADD_SUCCESS:
      return [...state, payload];
    case REMOVE_SUCCESS:
      return state.filter((error) => error.id !== payload);
    case REMOVE_SUCCESSES:
      return [];
    default:
      return state;
  }
}
