import React from 'react';
import { useTheme, useMediaQuery } from '@material-ui/core';
import PropTypes from 'prop-types';
import ConfirmationWindowPresentational from './ConfirmationWindowPresentational';

function ConfirmationWindowContainer({ confirmationText, confirmationTitle, open }) {
  const [open, setOpen] = React.useState(true);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <ConfirmationWindowPresentational
      confirmationText={confirmationText}
      confirmationTitle={confirmationTitle}
      open={open}
      fullScreen={fullScreen}
      handleClose={handleClose}
    />
  );
}

ConfirmationWindowContainer.propTypes = {
  confirmationTitle: PropTypes.string.isRequired,
  confirmationText: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
};

export default ConfirmationWindowContainer;
