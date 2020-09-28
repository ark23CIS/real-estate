import React from 'react';
import { Visibility } from '@material-ui/icons';
import PropTypes from 'prop-types';

function Views({ amountOfViews }) {
  return (
    <div>
      <Visibility />
      <span>{amountOfViews}</span>
    </div>
  );
}

Views.propTypes = {
  amountOfViews: PropTypes.number.isRequired,
};

export default Views;
