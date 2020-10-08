import { v4 as uuidv4 } from 'uuid';
import { REMOVE_SUCCESS, ADD_SUCCESS } from './types';

export const addSuccessStatus = (error, timeout = 5000) => (dispatch) => {
  const id = uuidv4();
  dispatch({
    type: ADD_SUCCESS,
    payload: { msg: error.msg, id },
  });

  setTimeout(() => {
    dispatch({ type: REMOVE_SUCCESS, payload: id });
  }, timeout);
};
