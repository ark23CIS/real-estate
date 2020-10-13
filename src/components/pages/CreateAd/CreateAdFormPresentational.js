import React from 'react';
import { Container, Typography, TextField, Avatar, Button, CssBaseline } from '@material-ui/core';
import PropTypes from 'prop-types';
import ImageUploader from 'react-images-upload';

function CreateAdFormPresentational({
  classes,
  fields,
  onPhotosChange,
  onAddressChange,
  onFieldChange,
  onSubmit,
  iconComponent,
  label,
  errors,
}) {
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
              .map(({ name, label, type, required }, index) => (
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  name={name}
                  label={label}
                  id={name}
                  autoComplete={name}
                  autoFocus
                  required={required}
                  helperText={
                    errors.map((error) => error.param).includes(name)
                      ? errors.filter(({ param }) => param === name)[0].msg
                      : ''
                  }
                  error={errors.map((error) => error.param).includes(name)}
                  onChange={type === 'location' ? onAddressChange : onFieldChange}
                  key={`${name}_${index}`}
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

CreateAdFormPresentational.propTypes = {
  classes: PropTypes.object.isRequired,
  fields: PropTypes.arrayOf(PropTypes.object).isRequired,
  onPhotosChange: PropTypes.func.isRequired,
  onAddressChange: PropTypes.func.isRequired,
  onFieldChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  iconComponent: PropTypes.element.isRequired,
  label: PropTypes.string.isRequired,
  errors: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)).isRequired,
};

export default CreateAdFormPresentational;
