import React from 'react';
import './banner.scss';
import PropTypes from 'prop-types';

function Banner({ children, title, subtitle }) {
  return (
    <div className="banner">
      <h1 className="banner__title">{title}</h1>
      <div />
      <p>{subtitle}</p>
      {children}
    </div>
  );
}

Banner.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
  subtitle: PropTypes.string,
};

Banner.defaultProps = {
  children: null,
  title: '',
  subtitle: '',
};

export default Banner;
