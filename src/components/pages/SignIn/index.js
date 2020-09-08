import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../../../redux/actions";
import { Link, Redirect } from "react-router-dom";
import "../SignUp/sign-up.scss";

function SignIn() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const [loginData, setLoginData] = React.useState({
    password: "",
    email: "",
  });
  const onClick = React.useCallback(async () => {
    dispatch(login(loginData));
  }, [dispatch, loginData]);
  const onChange = React.useCallback(
    (e) => {
      setLoginData({
        ...loginData,
        [e.target.name]: e.target.value,
      });
    },
    [loginData]
  );
  if (auth.isAuthenticated) {
    return <Redirect to={`/estates/`} />;
  }
  return (
    <div className="form-container">
      <div className="form-content">
        <div className="form">
          <h1>Rent Real Estate today!</h1>
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
          <button className="form__input-btn" type="submit" onClick={onClick}>
            Sign In
          </button>
          <span>
            Don't have an account yet ? <Link to="/signup">Sign Up</Link>
          </span>
        </div>
      </div>
    </div>
  );
}

export default React.memo(SignIn);
