import axios from "axios";
import { setAuthToken } from "../helpers";
import { addError } from "./error";
import {
  REGISTER_COMPLETE,
  REGISTER_FAIL,
  AUTH_ERROR,
  USER_LOADED,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_PROFILE,
  CONFIRMATION,
} from "./types";

export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    const res = await axios.get("/api/auth");
    dispatch({ type: USER_LOADED, payload: res.data });
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(addError(error.msg)));
    }
    dispatch({ type: AUTH_ERROR });
  }
};

export const register = ({
  firstName,
  lastName,
  email,
  password,
  history,
}) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ email, firstName, lastName, password });
  try {
    await axios.post("/api/users", body, config);
    history.push("/check-info");
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(addError(error.msg)));
    }
    dispatch({
      type: REGISTER_FAIL,
    });
  }
};

export const confirm = (hash) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/users/confirm?hash=${hash}`);
    dispatch({ type: CONFIRMATION, payload: res.data.confirmation_status });
  } catch (err) {
    dispatch({ type: CONFIRMATION, payload: "error" });
  }
};

export const login = ({ email, password }) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ email, password });
  try {
    const res = await axios.post("/api/auth", body, config);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });
    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(addError(error.msg)));
    }
    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

export const logout = () => (dispatch) => {
  dispatch({
    type: CLEAR_PROFILE,
  });
  dispatch({ type: LOGOUT });
};
