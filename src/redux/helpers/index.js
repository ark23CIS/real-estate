import axios from 'axios';

export const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common['x-auth-token'] = token;
  } else {
    delete axios.defaults.headers.common['x-auth-token'];
  }
};

export const configContentType = (ContentTypeValue = 'application/json') => {
  return {
    headers: {
      'Content-Type': ContentTypeValue,
    },
  };
};
