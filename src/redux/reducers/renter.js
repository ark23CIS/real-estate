import { GET_RENTERS, GET_RENTER } from "../actions/types";

const initState = {
  renter: null,
  renters: [],
  error: {},
};

export default function (state = initState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_RENTER:
      return {
        ...state,
        renter: payload,
      };
    case GET_RENTERS:
      return {
        ...state,
        renters: payload,
      };
    default:
      return { ...state };
  }
}
