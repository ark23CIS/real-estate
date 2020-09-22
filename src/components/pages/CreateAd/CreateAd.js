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
import {} from "../../../redux/actions";
import { useSelector, useDispatch } from "react-redux";
import { useStyles } from "../SignIn/signin-helper";
import PropTypes from "prop-types";

function CreateAd({ label, iconComponent, fields }) {
  const classes = useStyles();
  const [ADData, setADData] = React.useState({});
  const dispatch = useDispatch();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>{iconComponent}</Avatar>
        <Typography component="h1" variant="h5">
          {label}
        </Typography>
        <div className={classes.form}>
          {fields &&
            fields
              .filter(({ belongs }) =>
                label === "renter" ? belongs !== "estate" : belongs !== "renter"
              )
              .map(({ name, label }, index) => (
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  name={name}
                  label={label}
                  id={name}
                  autoComplete={name}
                  autoFocus
                  onChange={null}
                  key={`${name}_${index}`}
                />
              ))}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={null}
          >
            Submit
          </Button>
        </div>
      </div>
    </Container>
  );
}

export default CreateAd;
