import axios from "axios";
import { GET_ESTATE, GET_RENTER } from "./types";

export const createAD = (data, type, history) => (dispatch) => {
  const { pictures } = data;
  Promise.all(
    pictures.reduce((p, c) => {
      const form = new FormData();
      form.append("file", c);
      return [
        ...p,
        axios.post(
          `/api/files/${type === "estate" ? "estate" : "renter"}`,
          form,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        ),
      ];
    }, [])
  )
    .then(async (values) => {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const adRes = await axios.post(
        `/api/${type === "estate" ? "estates" : "renters"}`,
        { ...data, photos: values.map(({ data: { photo } }) => photo) },
        config
      );
      dispatch({
        type: type === "estate" ? GET_ESTATE : GET_RENTER,
        payload: adRes.data,
      });
      history.push(
        `/${type === "estate" ? "estates" : "renters"}/${adRes.data._id}`
      );
    })
    .catch((err) => {
      console.log(err.message);
    });
};

export const getEstateByID = (estate_id) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await axios.get(`/api/estates/id/${estate_id}`, config);
    dispatch({ type: GET_ESTATE, payload: res.data });
  } catch (err) {
    console.log(err.message);
  }
};
