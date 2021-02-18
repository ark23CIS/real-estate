import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { createAD, clearError } from '../../../redux/actions';
import { useStyles } from '../SignIn/signin-helper';
import CreateAdFormPresentational from './CreateAdFormPresentational';

function CreateAdFormContainer({ label, iconComponent, fields, history }) {
  const classes = useStyles();
  const errors = useSelector((state) => state.error);

  const [ADData, setADData] = React.useState({ pictures: [] });
  const dispatch = useDispatch();

  React.useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  const onPhotosChange = React.useCallback(
    (pictures) => {
      setADData((ADData) => ({
        ...ADData,
        pictures,
      }));
    },
    [ADData],
  );

  const onAddressChange = React.useCallback(
    (e) => {
      const { target } = e;
      setADData((ADData) => ({
        ...ADData,
        estateAddress: { ...ADData.estateAddress, [target.name]: target.value },
      }));
    },
    [ADData],
  );

  const onFieldChange = React.useCallback(
    (e) => {
      const target = e.target;
      setADData((ADData) => ({
        ...ADData,
        [target.name]: target.value,
      }));
    },
    [ADData],
  );

  const onSubmit = React.useCallback(() => {
    dispatch(clearError());
    dispatch(createAD(ADData, label, history));
  }, [ADData, dispatch]);

  return (
    <CreateAdFormPresentational
      classes={classes}
      fields={fields}
      onPhotosChange={onPhotosChange}
      onAddressChange={onAddressChange}
      onFieldChange={onFieldChange}
      onSubmit={onSubmit}
      iconComponent={iconComponent}
      label={label}
      errors={errors}
    />
  );
}

CreateAdFormContainer.propTypes = {
  history: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  iconComponent: PropTypes.element.isRequired,
  fields: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default React.memo(withRouter(CreateAdFormContainer));
