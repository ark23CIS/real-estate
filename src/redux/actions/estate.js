import axios from 'axios';
import { addError } from './index';
import { GET_ESTATE, GET_RENTER, GET_ESTATES, GET_RENTERS } from './types';
import { getProfile } from './profile';
import { configContentType } from '../helpers';

export const createAD = (data, type, history) => (dispatch) => {
  const { pictures } = data;
  Promise.all(
    pictures.reduce((p, c) => {
      const form = new FormData();
      form.append('file', c);
      return [
        ...p,
        axios.post(
          `/api/files/${type === 'estate' ? 'estate' : 'renter'}`,
          form,
          configContentType('multipart/form-data'),
        ),
      ];
    }, []),
  )
    .then(async (values) => {
      data = {
        ...data,
        footage: parseInt(data.footage),
        [type === 'estate' ? 'price' : 'maxPrice']: parseInt(
          type === 'estate' ? data.price : data.maxPrice,
        ),
      };
      const adRes = await axios.post(
        `/api/${type === 'estate' ? 'estates' : 'renters'}`,
        { ...data, photos: values.map(({ data: { photo } }) => photo) },
        configContentType(),
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
    const res = await axios.get(`/api/estates/id/${estate_id}`);
    dispatch({ type: GET_ESTATE, payload: res.data });
  } catch (err) {
    console.log(err.message);
  }
};

export const getAllEstates = () => async (dispatch) => {
  try {
    const res = await axios.get(`/api/estates`);
    dispatch({ type: GET_ESTATES, payload: res.data });
  } catch (err) {
    console.log(err.message);
  }
};

export const commentEstate = ({ commented_collection, text }) => async (dispatch) => {
  try {
    const res = await axios.put(
      `/api/estates/comment/${commented_collection}`,
      { text },
      configContentType(),
    );
    dispatch({ type: GET_ESTATE, payload: res.data });
  } catch (err) {
    console.log(err.message);
  }
};

export const uncommentEstate = ({ uncommentedCollection, commentID }) => async (dispatch) => {
  try {
    const res = await axios.put(
      `/api/estates/uncomment/${uncommentedCollection}`,
      { commentID },
      configContentType(),
    );
    dispatch({ type: GET_ESTATE, payload: res.data });
  } catch (err) {
    console.log(err.message);
  }
};

export const rateEstate = ({ rating, rated_collection, isSearchPage = false }) => async (
  dispatch,
) => {
  try {
    const res = await axios.put(
      `/api/estates/rate/${rated_collection}`,
      { rating },
      configContentType(),
    );
    !isSearchPage ? dispatch({ type: GET_ESTATE, payload: res.data }) : dispatch(getAllEstates());
  } catch (err) {
    console.log(err.message);
  }
};

export const likeEstate = (liked_collection, isSearchPage = false) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/estates/like/${liked_collection}`, null, configContentType());
    !isSearchPage ? dispatch({ type: GET_ESTATE, payload: res.data }) : dispatch(getAllEstates());
  } catch (err) {
    console.log(err.message);
  }
};

export const dislikeEstate = (disliked_collection, isSearchPage = false) => async (dispatch) => {
  try {
    const res = await axios.put(
      `/api/estates/dislike/${disliked_collection}`,
      null,
      configContentType(),
    );
    !isSearchPage ? dispatch({ type: GET_ESTATE, payload: res.data }) : dispatch(getAllEstates());
  } catch (err) {
    console.log(err.message);
  }
};
export const searchAds = ({
  sortBy,
  minFootage,
  maxFootage,
  minPrice,
  maxPrice,
  AdType,
  searchQuery,
}) => async (dispatch) => {
  try {
    const res = await axios.get(
      `/api/${AdType}/search?searchquery=${searchQuery}&sortBy=${sortBy}&minprice=${minPrice}&maxprice=${maxPrice}&maxFootage=${maxFootage}&minFootage=${minFootage}`,
    );
    dispatch({ type: AdType === 'renters' ? GET_RENTERS : GET_ESTATES, payload: res.data });
  } catch (err) {
    console.log(err.message);
  }
};
