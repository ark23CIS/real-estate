import axios from 'axios';
import { addError } from './index';
import { GET_ESTATE, GET_RENTER } from './types';
import { getProfile } from './profile';

export const createAD = (data, type, history) => (dispatch) => {
  const { pictures } = data;
  Promise.all(
    pictures.reduce((p, c) => {
      const form = new FormData();
      form.append('file', c);
      return [
        ...p,
        axios.post(`/api/files/${type === 'estate' ? 'estate' : 'renter'}`, form, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }),
      ];
    }, []),
  )
    .then(async (values) => {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const adRes = await axios.post(
        `/api/${type === 'estate' ? 'estates' : 'renters'}`,
        { ...data, photos: values.map(({ data: { photo } }) => photo) },
        config,
      );
      dispatch({
        type: type === 'estate' ? GET_ESTATE : GET_RENTER,
        payload: adRes.data,
      });
      history.push(`/${type === 'estate' ? 'estates' : 'renters'}/${adRes.data._id}`);
    })
    .catch((err) => {
      const errors = err.response.data.errors;
      if (errors) {
        errors.forEach((error) => dispatch(addError(error.msg)));
      }
    });
};

export const getEstateByID = (estate_id) => async (dispatch) => {
  try {
    dispatch(getProfile());
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const res = await axios.get(`/api/estates/id/${estate_id}`, config);
    dispatch({ type: GET_ESTATE, payload: res.data });
  } catch (err) {
    console.log(err.message);
  }
};

export const commentEstate = ({ commented_collection, text }) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const res = await axios.put(`/api/estates/comment/${commented_collection}`, { text }, config);
    dispatch({ type: GET_ESTATE, payload: res.data });
  } catch (err) {
    console.log(err.message);
  }
};

export const uncommentEstate = ({ uncommentedCollection, commentID }) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const res = await axios.put(
      `/api/estates/uncomment/${uncommentedCollection}`,
      { commentID },
      config,
    );
    dispatch({ type: GET_ESTATE, payload: res.data });
  } catch (err) {
    console.log(err.message);
  }
};

export const rateEstate = ({ rating, rated_collection }) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const res = await axios.put(`/api/estates/rate/${rated_collection}`, { rating }, config);
    dispatch({ type: GET_ESTATE, payload: res.data });
  } catch (err) {
    console.log(err.message);
  }
};

export const likeEstate = (liked_collection) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const res = await axios.put(`/api/estates/like/${liked_collection}`, null, config);
    dispatch({ type: GET_ESTATE, payload: res.data });
  } catch (err) {
    console.log(err.message);
  }
};

export const dislikeEstate = (disliked_collection) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const res = await axios.put(`/api/estates/dislike/${disliked_collection}`, null, config);
    dispatch({ type: GET_ESTATE, payload: res.data });
  } catch (err) {
    console.log(err.message);
  }
};
