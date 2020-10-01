import {
  GET_PROFILE,
  PROFILE_ERROR,
  GET_PROFILES,
  CLEAR_PROFILE,
  CREATE_PROFILE,
  UPDATE_PROFILE_PHOTO,
} from '../actions/types';

const initState = {
  profile: null,
  profiles: [],
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
      };
    case PROFILE_ERROR:
      return {
        ...state,
        error: payload,
      };
    case GET_PROFILES:
      return {
        ...state,
        profiles: payload,
      };
    case CLEAR_PROFILE:
      return {
        ...state,
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
