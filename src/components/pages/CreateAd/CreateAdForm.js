import React from 'react';
import { Container, Typography, TextField, Avatar, Button, CssBaseline } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import ImageUploader from 'react-images-upload';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { createAD } from '../../../redux/actions';
import { useStyles } from '../SignIn/signin-helper';

function CreateAdForm({ label, iconComponent, fields, history }) {
  const classes = useStyles();
  const [ADData, setADData] = React.useState({ pictures: [] });
  const dispatch = useDispatch();

  const onPhotosChange = React.useCallback(
    (pictures) => {
      setADData((ADData) => ({
        ...ADData,
        pictures: pictures,
      }));
    },
    [ADData],
  );

  const onAddressChange = React.useCallback(
    (e) => {
      const target = e.target;
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
    dispatch(createAD(ADData, label, history));
  }, [ADData, dispatch]);

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper} style={{ marginTop: 0 }}>
        <Avatar className={classes.avatar}>{iconComponent}</Avatar>
        <Typography component="h1" variant="h5">
          {label}
        </Typography>
        <div className={classes.form}>
          {fields &&
            fields
              .filter(({ belongs }) =>
                label === 'renter' ? belongs !== 'estate' : belongs !== 'renter',
              )
              .map(({ name, label, type }, index) => (
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  name={name}
                  label={label}
                  id={name}
                  autoComplete={name}
                  autoFocus
                  onChange={type === 'location' ? onAddressChange : onFieldChange}
                  key={`${name}_${index}`}
                  required
                />
              ))}
          <ImageUploader
            withIcon={true}
            withPreview={true}
            buttonText={`Choose ${label} images`}
            onChange={onPhotosChange}
            imgExtension={['.jpg', '.gif', '.png', '.gif', 'jpeg']}
            maxFileSize={5242880}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={onSubmit}
          >
            Submit
          </Button>
        </div>
      </div>
    </Container>
  );
}

CreateAdForm.propTypes = {
  history: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  iconComponent: PropTypes.element.isRequired,
  fields: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default React.memo(withRouter(CreateAdForm));
