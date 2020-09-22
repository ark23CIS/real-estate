import {
  GET_PROFILE,
  PROFILE_ERROR,
  GET_PROFILES,
  CLEAR_PROFILE,
  CREATE_PROFILE,
  UPDATE_PROFILE_PHOTO,
} from "../actions/types";

const initState = {
  profile: null,
  profiles: [],
  loading: true,
  error: {},
};

export default function (state = initState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_PROFILE:
    case CREATE_PROFILE:
      return {
        ...state,
        profile: payload,
        loading: false,
      };
    case PROFILE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case GET_PROFILES:
      return {
        ...state,
        profiles: payload,
      };
    case CLEAR_PROFILE:
      return {
        ...state,
        loading: false,
        profile: null,
      };
    case UPDATE_PROFILE_PHOTO:
      return {
        ...state,
        profile: { ...state.profile, photo: payload },
      };
    default:
      return state;
  }
}
