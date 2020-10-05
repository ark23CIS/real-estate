import React from 'react';
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Success() {
  const successes = useSelector((state) => state.success);

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

export default React.memo(Success);
