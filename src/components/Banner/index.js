import React from "react";
import "./banner.scss";
import PropTypes from "prop-types";

function index({ children, title, subtitle }) {
  return (
    <div className="banner">
      <h1>{title}</h1>
      <div />
      <p>{subtitle}</p>
      {children}
    </div>
  );
}

index.propTypes = {
  children: PropTypes.string,
  title: PropTypes.string,
  subtitle: PropTypes.string,
};

export default index;
