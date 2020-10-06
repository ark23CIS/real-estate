import React from 'react';
import { useSelector } from 'react-redux';
import ErrorPresentational from './ErrorPresentational';

function ErrorContainer() {
  const errors = useSelector((state) => state.error);

  return <ErrorPresentational errors={errors} />;
}

export default React.memo(ErrorContainer);
