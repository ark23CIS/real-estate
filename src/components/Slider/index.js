import React from 'react';
import Carousel from 'react-elastic-carousel';
import PropTypes from 'prop-types';
import Item from './Item';
import './slider.scss';

function Slider({ photoLinks }) {
  if (!photoLinks || !photoLinks.length) {
    photoLinks = ['https://banffventureforum.com/wp-content/uploads/2019/08/No-Image.png'];
  }
  return (
    <Carousel className="ad-images">
      {photoLinks &&
        photoLinks.map((link, index) => (
          <Item>
            <img
              style={{ height: '100%' }}
              src={link}
              alt={`${index} photo`}
              key={`${link}_${index}`}
            />
          </Item>
        ))}
    </Carousel>
  );
}

Slider.propTypes = {
  photoLinks: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Slider;
