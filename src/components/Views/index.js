import React from 'react';
import { Visibility } from '@material-ui/icons';
import PropTypes from 'prop-types';

function Views({ amountOfViews }) {
  return (
    <div className="rate-block">
      <Visibility />
      <div className="rate-block__appraisal">{amountOfViews}</div>
    </div>
  );
}

Views.propTypes = {
  amountOfViews: PropTypes.number.isRequired,
};

export default Views;
