import React from "react";
import { useSelector } from "react-redux";
import "./error.scss";

function index() {
  const errors = useSelector((state) => state.error);
  console.log(errors);
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

export default React.memo(index);
