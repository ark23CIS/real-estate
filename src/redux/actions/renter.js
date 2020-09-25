import axios from "axios";
import { GET_RENTER } from "./types";

export const getRenterByID = (renter_id) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await axios.get(`/api/renters/id/${renter_id}`, config);
    dispatch({ type: GET_RENTER, payload: res.data });
  } catch (err) {
    console.log(err.message);
  }
};
