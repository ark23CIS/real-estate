import { GET_ESTATE, GET_ESTATES, LOGOUT } from '../actions/types';

const initState = {
  estate: null,
  estates: [],
  error: {},
};

export default function (state = initState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_ESTATE:
      return {
        ...state,
        estate: payload,
      };
    case GET_ESTATES:
      return {
        ...state,
        estates: payload,
      };
    case LOGOUT:
      return {
        ...state,
        estates: [],
        estate: null,
      };
    default:
      return { ...state };
  }
}
