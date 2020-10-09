import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import PropTypes from 'prop-types';
import 'react-toastify/dist/ReactToastify.css';

function SuccessPresentational({ successes }) {
  return (
    <ToastContainer>
      {successes &&
        successes.map((success) => {
          toast.success(success.msg, {
            autoClose: 2000,
          });
        })}
    </ToastContainer>
  );
}

SuccessPresentational.propTypes = {
  successes: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)).isRequired,
};

export default SuccessPresentational;
