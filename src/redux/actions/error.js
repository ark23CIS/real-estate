import { v4 as uuidv4 } from 'uuid';
import { REMOVE_ERROR, ADD_ERROR, ADD_ERRORS, REMOVE_ERRORS } from './types';

export const addError = (error) => (dispatch) => {
  const id = uuidv4();
  dispatch({
    type: ADD_ERROR,
    payload: { msg: error.msg, id, param: error.param },
  });
};

export const addErrorAndDelete = (error, timeout = 1000) => (dispatch) => {
  const id = uuidv4();
  dispatch({ type: ADD_ERRORS, payload: [{ msg: error.msg, id, param: error.param }] });
  setTimeout(() => {
    dispatch({ type: REMOVE_ERROR, payload: id });
  }, timeout);
};

export const addErrors = (errors) => (dispatch) => {
  const newErrors = errors.reduce((p, c) => [...p, { ...c, id: uuidv4() }], []);
  dispatch({ type: ADD_ERRORS, payload: newErrors });
};

export const clearError = () => (dispatch) => {
  dispatch({
    type: REMOVE_ERRORS,
  });
};
