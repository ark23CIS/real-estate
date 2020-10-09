import React from 'react';
import { useTheme, useMediaQuery } from '@material-ui/core';
import PropTypes from 'prop-types';
import ConfirmationWindowPresentational from './ConfirmationWindowPresentational';

function ConfirmationWindowContainer({
  confirmationText,
  confirmationTitle,
  open,
  handleClose,
  confirm,
}) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <ConfirmationWindowPresentational
      confirmationText={confirmationText}
      confirmationTitle={confirmationTitle}
      open={open}
      fullScreen={fullScreen}
      handleClose={handleClose}
      confirm={confirm}
    />
  );
}

ConfirmationWindowContainer.propTypes = {
  confirmationTitle: PropTypes.string.isRequired,
  confirmationText: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  confirm: PropTypes.func.isRequired,
};

export default ConfirmationWindowContainer;
