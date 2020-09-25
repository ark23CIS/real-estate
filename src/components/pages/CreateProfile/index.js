import React from "react";
import {
  Container,
  Typography,
  TextField,
  Avatar,
  Button,
  CssBaseline,
} from "@material-ui/core";
import { withRouter } from "react-router-dom";
import { createProfile } from "../../../redux/actions";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { useStyles } from "../SignIn/signin-helper";
import PropTypes from "prop-types";
import { socials } from "./createProfile-helper";

function SignIn({ socials, history }) {
  const classes = useStyles();
  const [profileData, setProfileData] = React.useState({});
  const dispatch = useDispatch();
  const {
    profile: { profile },
  } = useSelector((state) => state);

  const onFieldChange = React.useCallback(
    (e) => {
      const target = e.target;
      setProfileData((profileData) => ({
        ...profileData,
        [target.name]: target.value,
      }));
    },
    [profileData]
  );

  const onClick = React.useCallback(() => {
    dispatch(createProfile(profileData, history));
  }, [profileData]);

  const photoChange = React.useCallback(
    (e) => {
      const target = e.target;
      const data = new FormData();
      data.append("file", target.files[0]);
      setProfileData((profileData) => ({
        ...profileData,
        photo: data,
      }));
    },
    [profileData]
  );

  if (profile) {
    return <Redirect to={`/profiles/me`} />;
  }

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

SignIn.propTypes = {
  socials: PropTypes.arrayOf(PropTypes.object).isRequired,
  history: PropTypes.object,
};

SignIn.defaultProps = {
  socials,
};

export default React.memo(withRouter(SignIn));
