import { ADD_ERROR, REMOVE_ERROR } from '../actions/types';

const initState = [];

export default function (state = initState, action) {
  const { type, payload } = action;
  switch (type) {
    case ADD_ERROR:
      return [...state, payload];
    case REMOVE_ERROR:
      return state.filter((error) => error.id !== payload);
    default:
      return state;
  }
}
