import axios from "axios";
import { addError } from "./index";
import {
  GET_PROFILE,
  PROFILE_ERROR,
  GET_PROFILES,
  CREATE_PROFILE,
} from "./types";

export const getProfile = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/profiles/me");
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText },
    });
  }
};

export const getAllProfiles = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/profiles");
    dispatch({
      type: GET_PROFILES,
      payload: res.data,
    });
  } catch (err) {
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
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText },
    });
  }
};

export const createProfile = (data, history) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await axios.post("/api/profiles", data, config);
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
    history.push("/profiles/me");
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText },
    });
  }
};

export const likeProfile = (user_id) => async () => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    await axios.put(`/api/profiles/like/${user_id}`, null, config);
  } catch (err) {
    console.log(err.message);
  }
};

export const dislikeProfile = (user_id) => async () => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    await axios.put(`/api/profiles/dislike/${user_id}`, null, config);
    console.log(`/api/profiles/dislike/${user_id}`);
  } catch (err) {
    console.log(err.message);
  }
};

export const rateProfile = (user_id, rating) => async () => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    await axios.put(`/api/profiles/rate/${user_id}`, { rating }, config);
    console.log(`/api/profiles/rate/${user_id}`);
  } catch (err) {
    console.log(err.message);
  }
};
