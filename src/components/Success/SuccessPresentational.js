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
            autoClose: 5000,
          });
        })}
    </ToastContainer>
  );
}

SuccessPresentational.propTypes = {
  successes: PropTypes.object.isRequired,
};

export default SuccessPresentational;
