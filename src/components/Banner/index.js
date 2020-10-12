import React from 'react';
import './banner.scss';
import PropTypes from 'prop-types';

function Banner({ children, title, subtitle, styles }) {
  return (
    <div className="banner" style={styles}>
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
  styles: PropTypes.object,
};

Banner.defaultProps = {
  children: null,
  title: '',
  subtitle: '',
};

export default Banner;
