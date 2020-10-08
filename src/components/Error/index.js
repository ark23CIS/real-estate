import React from 'react';
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import ErrorPresentational from './ErrorPresentational';

function ErrorContainer() {
  const errors = useSelector((state) => state.error);
  React.useEffect(() => {
    if (errors) {
      errors.forEach((error) => toast.error(error.msg));
      console.log('from useEFFECT');
    }
  }, [errors]);
  console.log(errors);
  return <ErrorPresentational errors={errors} />;
}

export default React.memo(ErrorContainer);
