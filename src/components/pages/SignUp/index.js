import React from "react";
import { Link } from "react-router-dom";
import "./sign-up.scss";

function SignUp() {
  return (
    <div className="form-container">
      <div className="form-content">
        <form className="form">
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
          <div className="form-inputs">
            <label htmlFor="confirm-password" className="form__label">
              Confirm Password
            </label>
            <input
              id="confirm-password"
              type="confirm-password"
              className="form__input"
              name="confirm-password"
              placeholder="Confirm Password"
            />
          </div>
          <button className="form__input-btn" type="submit">
            Sign Up
          </button>
          <span>
            Already have an account ? <Link to="/signin">Login</Link>
          </span>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
