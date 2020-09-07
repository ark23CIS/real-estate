import React from "react";
import { useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import "../SignUp/sign-up.scss";

function SignIn() {
  const auth = useSelector((state) => state.auth);
  if (auth.isAuthenticated) {
    return <Redirect to={`/profiles/${auth.user._id}`} />;
  }
  return (
    <div className="form-container">
      <div className="form-content">
        <form className="form">
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
            />
          </div>
          <button className="form__input-btn" type="submit">
            Sign In
          </button>
          <span>
            Don't have an account yet ? <Link to="/signup">Sign Up</Link>
          </span>
        </form>
      </div>
    </div>
  );
}

export default React.memo(SignIn);
