import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import PropTypes from 'prop-types';
import 'react-toastify/dist/ReactToastify.css';

function ErrorPresentational({ errors }) {
  return (
    <ToastContainer>
      {errors &&
        errors.map((error) => {
          toast.error(error.msg, {
            autoClose: 5000,
          });
        })}
    </ToastContainer>
  );
}

ErrorPresentational.propTypes = {
  errors: PropTypes.object.isRequired,
};

export default ErrorPresentational;
