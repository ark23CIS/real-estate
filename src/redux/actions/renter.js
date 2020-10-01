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

export const rateRenter = ({ rating, rated_collection, isSearchPage = false }) => async (
  dispatch,
) => {
  try {
    const res = await axios.put(
      `/api/renters/rate/${rated_collection}`,
      { rating },
      configContentType(),
    );
    !isSearchPage ? dispatch({ type: GET_RENTER, payload: res.data }) : dispatch(getAllRenters());
  } catch (err) {
    console.log(err.message);
  }
};

export const likeRenter = (liked_collection, isSearchPage = false) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/renters/like/${liked_collection}`, null, configContentType());
    !isSearchPage ? dispatch({ type: GET_RENTER, payload: res.data }) : dispatch(getAllRenters());
  } catch (err) {
    console.log(err.message);
  }
};

export const dislikeRenter = (disliked_collection, isSearchPage = false) => async (dispatch) => {
  try {
    const res = await axios.put(
      `/api/renters/dislike/${disliked_collection}`,
      null,
      configContentType(),
    );
    !isSearchPage ? dispatch({ type: GET_RENTER, payload: res.data }) : dispatch(getAllRenters());
  } catch (err) {
    console.log(err.message);
  }
};
