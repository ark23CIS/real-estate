import React from 'react';
import { useSelector } from 'react-redux';
import SuccessPresentational from './SuccessPresentational';

function SuccessContainer() {
  const successes = useSelector((state) => state.success);

  return <SuccessPresentational successes={successes} />;
}

export default React.memo(SuccessContainer);
