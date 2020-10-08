import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import PropTypes from 'prop-types';
import 'react-toastify/dist/ReactToastify.css';

function ErrorPresentational({ errors }) {
  return <ToastContainer autoClose={2000} />;
}

ErrorPresentational.propTypes = {
  errors: PropTypes.object.isRequired,
};

export default ErrorPresentational;
