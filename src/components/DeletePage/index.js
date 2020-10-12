import React from 'react';
import PropTypes from 'prop-types';
import DeletePresentational from './DeletePresentational';

function DeleteContainer({ onDelete }) {
  const [state, setState] = React.useState({
    isDeleteWindowOpen: false,
  });

  const toggleDeleteWindow = React.useCallback(() => {
    setState((state) => ({
      ...state,
      isDeleteWindowOpen: !state.isDeleteWindowOpen,
    }));
  }, [state]);
  return (
    <DeletePresentational
      onDelete={() => {
        onDelete();
        toggleDeleteWindow();
      }}
      toggleWindow={toggleDeleteWindow}
      isWindowOpen={state.isDeleteWindowOpen}
    />
  );
}

DeleteContainer.propTypes = {
  onDelete: PropTypes.func.isRequired,
};

export default DeleteContainer;
