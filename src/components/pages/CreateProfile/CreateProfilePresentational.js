import React from 'react';
import { Container, Typography, TextField, Avatar, Button, CssBaseline } from '@material-ui/core';

function CreateProfilePresentational({ classes, socials, onFieldChange, photoChange, onClick }) {
  return (
    <Container component="main" maxWidth="xs" className="mu-block">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar} />
        <Typography component="h1" variant="h5">
          Create Profile
        </Typography>
        <div className={classes.form}>
          {socials &&
            socials.map(({ name, label }, index) => (
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                name={name}
                label={label}
                id={name}
                autoComplete={name}
                autoFocus
                onChange={onFieldChange}
                key={`${name}_${index}`}
              />
            ))}
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            name="contactNumber"
            label="Contact Number"
            id="contactNumber"
            autoComplete="contactNumber"
            autoFocus
            required
            onChange={onFieldChange}
          />
          <input type="file" name="photo" id="photo" onChange={photoChange} />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={onClick}
          >
            Submit
          </Button>
        </div>
      </div>
    </Container>
  );
}

export default CreateProfilePresentational;
