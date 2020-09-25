import React from "react";
import Carousel from "react-elastic-carousel";
import PropTypes from "prop-types";
import Item from "./Item";
import "./slider.scss";

function index({ photoLinks }) {
  return (
    <Carousel className="ad-images">
      {photoLinks &&
        photoLinks.map((link, index) => (
          <Item>
            <img
              style={{ height: "100%" }}
              src={link}
              key={`${link}_${index}`}
            />
          </Item>
        ))}
    </Carousel>
  );
}

index.propTypes = {
  photoLinks: PropTypes.arrayOf(PropTypes.string),
};

export default index;
