import { v4 as uuidv4 } from "uuid";
import { REMOVE_ERROR, ADD_ERROR } from "./types";

export const addError = (msg, timeout = 3000) => (dispatch) => {
  const id = uuidv4();
  dispatch({
    type: ADD_ERROR,
    payload: { msg, id },
  });

  setTimeout(() => {
    dispatch({ type: REMOVE_ERROR, payload: id });
  }, timeout);
};
