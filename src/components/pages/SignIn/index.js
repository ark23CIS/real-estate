import React from "react";
import { Link } from "react-router-dom";
import "../SignUp/sign-up.scss";

function SignIn() {
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

export default SignIn;
