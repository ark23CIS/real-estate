import { v4 as uuidv4 } from 'uuid';
import { REMOVE_SUCCESS, ADD_SUCCESS, REMOVE_SUCCESSES } from './types';

export const addSuccessStatus = (error, deletePreviousErrors = true, timeout = 2000) => (
  dispatch,
) => {
  const id = uuidv4();
  dispatch({
    type: ADD_SUCCESS,
    payload: { msg: error.msg, id },
  });

  if (deletePreviousErrors) dispatch({ type: REMOVE_SUCCESSES });

  setTimeout(() => {
    dispatch({ type: REMOVE_SUCCESS, payload: id });
  }, timeout);
};

export const removeSuccesses = () => {
  dispatch({
    type: REMOVE_SUCCESSES,
  });
};
