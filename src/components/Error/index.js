import React from 'react';
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Error() {
  const errors = useSelector((state) => state.error);

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

export default React.memo(Error);
