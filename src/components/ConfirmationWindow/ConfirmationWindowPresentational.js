import React from 'react';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContentText,
  DialogContent,
  DialogActions,
} from '@material-ui/core';
import PropTypes from 'prop-types';

function ConfirmationWindowPresentational({
  confirmationTitle,
  confirmationText,
  open,
  fullScreen,
  handleClose,
  confirm,
}) {
  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle id="responsive-dialog-title">{confirmationTitle}</DialogTitle>
      <DialogContent>
        <DialogContentText>{confirmationText}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={confirm} color="primary" autoFocus>
          Accept
        </Button>
      </DialogActions>
    </Dialog>
  );
}

ConfirmationWindowPresentational.propTypes = {
  confirmationTitle: PropTypes.string.isRequired,
  confirmationText: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  fullScreen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  confirm: PropTypes.func.isRequired,
};

export default ConfirmationWindowPresentational;
