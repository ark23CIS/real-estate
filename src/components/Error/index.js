import React from 'react';
import { useSelector } from 'react-redux';
import './error.scss';

function Error() {
  const errors = useSelector((state) => state.error);
  errors &&
    errors.map((error) => (
      <div key={error.id} className="error">
        {error.msg}
      </div>
    ));

  return (
    <div className="errors">
      {errors &&
        errors.map((error) => {
          return (
            <div key={error.id} className="error">
              {error.msg}
            </div>
          );
        })}
    </div>
  );
}

export default React.memo(Error);
