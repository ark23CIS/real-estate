import React from 'react';
import PropTypes from 'prop-types';
import { ThumbUp } from '@material-ui/icons';

function LikePresentational({ isClickable, isActive, onThumbUp, amountOflikes }) {
  return (
    <div className="rate-block">
      <ThumbUp
        onClick={isClickable ? onThumbUp : null}
        className={isActive ? 'thumb-active cursor' : 'cursor'}
      />
      <div className="rate-block__appraisal">{amountOflikes}</div>
    </div>
  );
}

LikePresentational.propTypes = {
  isClickable: PropTypes.bool.isRequired,
  isActive: PropTypes.bool.isRequired,
  onThumbUp: PropTypes.func.isRequired,
  amountOflikes: PropTypes.number.isRequired,
};

export default LikePresentational;
