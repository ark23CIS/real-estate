import {
  REGISTER_COMPLETE,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CONFIRMATION,
} from "../actions/types";

const initState = {
  loading: true,
  user: null,
  isAuthenticated: null,
  confirmation_status: "sent",
  token: localStorage.getItem("token"),
};

export default function (state = initState, action) {
  const { type, payload } = action;

  switch (type) {
    case CONFIRMATION:
      return {
        ...state,
        confirmation_status: payload,
      };
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload,
      };
    case LOGIN_SUCCESS:
      localStorage.setItem("token", payload.token);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false,
      };
    case REGISTER_FAIL:
    case AUTH_ERROR:
    case LOGIN_FAIL:
      localStorage.removeItem("token");
      return {
        ...state,
        isAuthenticated: false,
        token: null,
        loading: false,
      };
    case LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        token: null,
        loading: false,
        confirmation_status: "sent",
      };
    default:
      return state;
  }
}
