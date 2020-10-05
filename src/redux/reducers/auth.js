import {
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CONFIRMATION,
  CLEAR_PROFILE,
} from '../actions/types';

const initState = {
  user: null,
  isAuthenticated: null,
  confirmation_status: 'sent',
  token: localStorage.getItem('token'),
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
        user: payload,
      };
    case LOGIN_SUCCESS:
      localStorage.setItem('token', payload.token);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
      };
    case REGISTER_FAIL:
    case AUTH_ERROR:
    case LOGIN_FAIL:
      localStorage.removeItem('token');
      return {
        ...state,
        isAuthenticated: false,
        token: null,
      };
    case LOGOUT:
    case CLEAR_PROFILE:
      return {
        ...state,
        isAuthenticated: false,
        token: null,
        confirmation_status: 'sent',
        user: null,
      };
    default:
      return state;
  }
}
