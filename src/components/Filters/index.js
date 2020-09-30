import React from 'react';
import PropTypes from 'prop-types';
import './filters.scss';

function index({ maxFootage, maxPrice, minFootage, minPrice, AdType, callback }) {
  console.log(maxFootage, minFootage, minPrice, AdType);
  return (
    <div className="filter-form">
      <div className="form-group">
        <label htmlFor="form-control">Ad type</label>
        <select
          name="AdType"
          id="form-control"
          className="form-control"
          onChange={(e) => callback(e.target.name, e.target.value)}
        >
          <option value="estates">Estates</option>
          <option value="renters">Renters</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="price">{AdType === 'renters' ? 'Renters' : 'Estates'} price</label>
        <div className="price-inputs">
          <input
            type="number"
            name="minPrice"
            className="price-input"
            value={minPrice}
            onChange={(e) => callback(e.target.name, parseInt(e.target.value))}
          />
          <input
            type="number"
            name="maxPrice"
            className="price-input"
            value={maxPrice}
            onChange={(e) => callback(e.target.name, parseInt(e.target.value))}
          />
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="footage">{AdType === 'renters' ? 'Renters' : 'Estates'} footage</label>
        <div className="footage-inputs">
          <input
            type="number"
            name="minFootage"
            className="footage-input"
            value={minFootage}
            onChange={(e) => callback(e.target.name, parseInt(e.target.value))}
          />
          <input
            type="number"
            name="maxFootage"
            className="footage-input"
            value={maxFootage}
            onChange={(e) => callback(e.target.name, parseInt(e.target.value))}
          />
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="form-control">Sort By</label>
        <select
          name="sortBy"
          id="form-control"
          className="form-control"
          onChange={(e) => callback(e.target.name, e.target.value)}
        >
          <option value="price">Price</option>
          <option value="creation-date">Creation date</option>
          <option value="rating">Rating</option>
        </select>
      </div>
    </div>
  );
}

index.propTypes = {
  callback: PropTypes.func.isRequired,
  AdType: PropTypes.string.isRequired,
  maxFootage: PropTypes.number.isRequired,
  maxPrice: PropTypes.number.isRequired,
  minPrice: PropTypes.number.isRequired,
  minFootage: PropTypes.number.isRequired,
};

export default index;
