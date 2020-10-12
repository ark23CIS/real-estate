import React from 'react';
import { Delete } from '@material-ui/icons';
import PropTypes from 'prop-types';
import { ConfirmationWindow } from '..';

function DeletePresentational({ toggleWindow, onDelete, isWindowOpen }) {
  return (
    <div>
      <ConfirmationWindow
        open={isWindowOpen}
        confirm={onDelete}
        handleClose={toggleWindow}
        confirmationTitle="Deleting the page"
        confirmationText="Do you really want to delete the page ?"
      />
      <Delete className="cursor" onClick={toggleWindow} />
    </div>
  );
}

DeletePresentational.propTypes = {
  onDelete: PropTypes.func.isRequired,
  toggleWindow: PropTypes.func.isRequired,
  isWindowOpen: PropTypes.bool.isRequired,
};

export default DeletePresentational;
