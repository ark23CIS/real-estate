import axios from 'axios';
import { addError, addSuccessStatus } from './index';
import { GET_RENTER, GET_RENTERS } from './types';
import { getProfile } from './index';
import { configContentType } from '../helpers';

export const getRenterByID = (renter_id) => async (dispatch) => {
  dispatch(getProfile());
  try {
    const res = await axios.get(`/api/renters/id/${renter_id}`);
    dispatch({ type: GET_RENTER, payload: res.data });
  } catch (err) {
    console.log(err.message);
  }
};

export const getAllRenters = () => async (dispatch) => {
  try {
    const res = await axios.get(`/api/renters`);
    dispatch({ type: GET_RENTERS, payload: res.data });
  } catch (err) {
    console.log(err.message);
  }
};

export const commentRenter = ({ commented_collection, text }) => async (dispatch) => {
  try {
    const res = await axios.put(
      `/api/renters/comment/${commented_collection}`,
      { text },
      configContentType(),
    );
    dispatch({ type: GET_RENTER, payload: res.data });
  } catch (err) {
    dispatch(addError('Error with commenting renter'));
  }
};

export const uncommentRenter = ({ uncommentedCollection, commentID }) => async (dispatch) => {
  try {
    const res = await axios.put(
      `/api/renters/uncomment/${uncommentedCollection}`,
      { commentID },
      configContentType(),
    );
    dispatch({ type: GET_RENTER, payload: res.data });
  } catch (err) {
    dispatch(addError('Error with uncomment renter'));
  }
};

export const rateRenter = ({ rating, rated_collection, pageType = '', pageOwnerID = '' }) => async (
  dispatch,
) => {
  try {
    const res = await axios.put(
      `/api/renters/rate/${rated_collection}`,
      { rating },
      configContentType(),
    );
    if (pageType === 'search') {
      dispatch(getAllRenters());
    } else if (pageType === 'single') {
      dispatch({ type: GET_RENTER, payload: res.data });
    } else if (pageType === 'specific') {
      dispatch(getRentersByUserID(pageOwnerID));
    }
    dispatch(addSuccessStatus(`You rated the page with ${rating} rating`));
  } catch (err) {
    dispatch(addError('Error with adding rating'));
  }
};

export const likeRenter = (liked_collection, pageType = '', pageOwnerID = '') => async (
  dispatch,
) => {
  try {
    const res = await axios.put(`/api/renters/like/${liked_collection}`, null, configContentType());
    if (pageType === 'search') {
      dispatch(getAllRenters());
    } else if (pageType === 'single') {
      dispatch({ type: GET_RENTER, payload: res.data });
    } else if (pageType === 'specific') {
      dispatch(getRentersByUserID(pageOwnerID));
    }
  } catch (err) {
    dispatch(addError('Error with like renter'));
  }
};

export const dislikeRenter = (disliked_collection, pageType = '', pageOwnerID = '') => async (
  dispatch,
) => {
  try {
    const res = await axios.put(
      `/api/renters/dislike/${disliked_collection}`,
      null,
      configContentType(),
    );
    if (pageType === 'search') {
      dispatch(getAllRenters());
    } else if (pageType === 'single') {
      dispatch({ type: GET_RENTER, payload: res.data });
    } else if (pageType === 'specific') {
      dispatch(getRentersByUserID(pageOwnerID));
    }
  } catch (err) {
    dispatch(addError('Error with dislike renter'));
  }
};

export const getRentersByUserID = (userID) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/renters/user/${userID}`);
    dispatch({ type: GET_RENTERS, payload: res.data });
  } catch (err) {
    console.log(err.message);
  }
};

export const deleteRenter = (renterID, history) => async (dispatch) => {
  try {
    await axios.delete(`/api/renters/${renterID}`);
    history.push('/search');
    dispatch(addSuccessStatus('You successfully deleted renter'));
  } catch (err) {
    dispatch(addError('Error with deleting renter'));
  }
};
