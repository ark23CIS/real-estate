import axios from "axios";
import { GET_ESTATE } from "./types";

export const createAD = (data, type, history) => (dispatch) => {
  try {
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
    ).then(async (values) => {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const estateRes = await axios.post(
        `/api/${type === "estate" ? "estates" : "renters"}`,
        { ...data, photos: values.map(({ data: { photo } }) => photo) },
        config
      );
      dispatch({
        type: GET_ESTATE,
        payload: estateRes.data,
      });
      history.push(
        `/${type === "estate" ? "estates" : "renters"}/${estateRes.data._id}`
      );
    });
  } catch (err) {
    console.log(err.message);
  }
};
