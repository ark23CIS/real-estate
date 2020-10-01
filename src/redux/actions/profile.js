import axios from 'axios';
import { addError } from './index';
import { GET_PROFILE, GET_PROFILES, PROFILE_ERROR, UPDATE_PROFILE_PHOTO } from './types';
import { configContentType } from '../helpers';

export const getProfile = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/profiles/me');
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    if (err.statusText)
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText },
      });
  }
};

export const getAllProfiles = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/profiles');
    dispatch({
      type: GET_PROFILES,
      payload: res.data,
    });
  } catch (err) {
    if (err.statusText)
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText },
      });
  }
};

export const getProfileByID = (user_id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/profiles/id/${user_id}`);
    dispatch({
      type: GET_PROFILES,
      payload: [res.data],
    });
  } catch (err) {
    if (err.statusText)
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText },
      });
  }
};

export const createProfile = (data, history) => async (dispatch) => {
  try {
    const res = await axios.post('/api/profiles', data, configContentType());
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
    if (data.photo) {
      const res = await axios.put(
        '/api/files/profile',
        data.photo,
        configContentType('multipart/form-data'),
      );
      dispatch({ type: UPDATE_PROFILE_PHOTO, payload: res.data.photo });
    }
    history.push('/profiles/me');
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(addError(error.msg)));
    }
    if (err.statusText)
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText },
      });
  }
};

export const likeProfile = (user_id) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/profiles/like/${user_id}`, null, configContentType());
    dispatch({ type: GET_PROFILES, payload: [res.data] });
  } catch (err) {
    if (err.statusText)
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText },
      });
  }
};

export const dislikeProfile = (user_id) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/profiles/dislike/${user_id}`, null, configContentType());
    dispatch({ type: GET_PROFILES, payload: [res.data] });
  } catch (err) {
    if (err.statusText)
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText },
      });
  }
};

export const rateProfile = (user_id, rating) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/profiles/rate/${user_id}`, { rating }, configContentType());
    dispatch({ type: GET_PROFILES, payload: [res.data] });
  } catch (err) {
    if (err.statusText)
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText },
      });
  }
};

export const commentProfile = ({ commented_collection, text }) => async (dispatch) => {
  try {
    const res = await axios.put(
      `/api/profiles/comment/${commented_collection}`,
      { text },
      configContentType(),
    );
    dispatch({ type: GET_PROFILES, payload: [res.data] });
  } catch (err) {
    console.log(err.message);
  }
};

export const uncommentProfile = ({ uncommentedCollection, commentID }) => async (dispatch) => {
  try {
    const res = await axios.put(
      `/api/profiles/uncomment/${uncommentedCollection}`,
      { commentID },
      configContentType(),
    );
    dispatch({ type: GET_PROFILES, payload: [res.data] });
  } catch (err) {
    console.log(err.message);
  }
};
