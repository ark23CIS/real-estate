import axios from 'axios';
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
    console.log(err.message);
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
    console.log(err.message);
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
  } catch (err) {
    console.log(err.message);
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
    console.log(err.message);
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
    console.log(err.message);
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
