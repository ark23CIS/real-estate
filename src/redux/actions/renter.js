import axios from 'axios';
import { GET_RENTER } from './types';
import { getProfile } from './index';

export const getRenterByID = (renter_id) => async (dispatch) => {
  dispatch(getProfile());
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const res = await axios.get(`/api/renters/id/${renter_id}`, config);
    dispatch({ type: GET_RENTER, payload: res.data });
  } catch (err) {
    console.log(err.message);
  }
};

export const commentRenter = ({ commented_collection, text }) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const res = await axios.put(`/api/renters/comment/${commented_collection}`, { text }, config);
    dispatch({ type: GET_RENTER, payload: res.data });
  } catch (err) {
    console.log(err.message);
  }
};

export const uncommentRenter = ({ uncommentedCollection, commentID }) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const res = await axios.put(
      `/api/renters/uncomment/${uncommentedCollection}`,
      { commentID },
      config,
    );
    dispatch({ type: GET_RENTER, payload: res.data });
  } catch (err) {
    console.log(err.message);
  }
};

export const rateRenter = ({ rating, rated_collection }) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const res = await axios.put(`/api/renters/rate/${rated_collection}`, { rating }, config);
    dispatch({ type: GET_RENTER, payload: res.data });
  } catch (err) {
    console.log(err.message);
  }
};

export const likeRenter = (liked_collection) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const res = await axios.put(`/api/renters/like/${liked_collection}`, null, config);
    dispatch({ type: GET_RENTER, payload: res.data });
  } catch (err) {
    console.log(err.message);
  }
};

export const dislikeRenter = (disliked_collection) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const res = await axios.put(`/api/renters/dislike/${disliked_collection}`, null, config);
    dispatch({ type: GET_RENTER, payload: res.data });
  } catch (err) {
    console.log(err.message);
  }
};
