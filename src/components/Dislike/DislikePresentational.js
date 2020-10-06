import React from 'react';
import { ThumbDown } from '@material-ui/icons';
import PropTypes from 'prop-types';

function DislikePresentational({ isClickable, isActive, onThumbDown, amountOfDislikes }) {
  return (
    <div className="rate-block">
      <ThumbDown
        onClick={isClickable ? onThumbDown : null}
        className={isActive ? 'thumb-active cursor' : 'cursor'}
      />
      <div className="rate-block__appraisal">{amountOfDislikes}</div>
    </div>
  );
}

DislikePresentational.propTypes = {
  isClickable: PropTypes.bool.isRequired,
  isActive: PropTypes.bool.isRequired,
  onThumbDown: PropTypes.func.isRequired,
  amountOfDislikes: PropTypes.number.isRequired,
};

export default DislikePresentational;
