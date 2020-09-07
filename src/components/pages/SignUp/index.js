import React from "react";
import { Link, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register, addError } from "../../../redux/actions";
import "./sign-up.scss";

function SignUp() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const [registrationData, setRegistrationData] = React.useState({
    firstName: "",
    lastName: "",
    password: "",
    email: "",
    passwordConfirm: "",
  });
  const onSubmit = React.useCallback(async () => {
    if (registrationData.password !== registrationData.passwordConfirm) {
      dispatch(addError("Password do not match"));
      console.log("error");
      return;
    }
    dispatch(register(registrationData));
  }, [dispatch, registrationData]);
  const onChange = React.useCallback(
    (e) => {
      setRegistrationData({
        ...registrationData,
        [e.target.name]: e.target.value,
      });
    },
    [registrationData]
  );
  if (auth.isAuthenticated) {
    return <Redirect to={`/profiles/${auth.user._id}`} />;
  }
  return (
    <div className="form-container">
      <div className="form-content">
        <div className="form">
          <h1>Rent Real Estate today!</h1>
          <div className="form-inputs">
            <label htmlFor="firstName" className="form__label">
              First Name
            </label>
            <input
              id="firstName"
              type="text"
              className="form__input"
              name="firstName"
              placeholder="First name"
              required
              onChange={onChange}
            />
          </div>
          <div className="form-inputs">
            <label htmlFor="lastName" className="form__label">
              Last name
            </label>
            <input
              id="lastName"
              type="text"
              className="form__input"
              name="lastName"
              placeholder="Last name"
              required
              onChange={onChange}
            />
          </div>
          <div className="form-inputs">
            <label htmlFor="email" className="form__label">
              Email
            </label>
            <input
              id="email"
              type="email"
              className="form__input"
              name="email"
              placeholder="Email"
              required
              onChange={onChange}
            />
          </div>
          <div className="form-inputs">
            <label htmlFor="password" className="form__label">
              Password
            </label>
            <input
              id="password"
              type="password"
              className="form__input"
              name="password"
              placeholder="Password"
              required
              onChange={onChange}
            />
          </div>
          <div className="form-inputs">
            <label htmlFor="confirm-password" className="form__label">
              Confirm Password
            </label>
            <input
              id="confirm-password"
              type="password"
              className="form__input"
              name="passwordConfirm"
              placeholder="Confirm Password"
              required
              onChange={onChange}
            />
          </div>
          <button className="form__input-btn" type="submit" onClick={onSubmit}>
            Sign Up
          </button>
          <span>
            Already have an account ? <Link to="/signin">Login</Link>
          </span>
        </div>
      </div>
    </div>
  );
}

export default React.memo(SignUp);
