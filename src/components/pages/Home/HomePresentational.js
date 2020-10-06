import React from 'react';
import { CreateAd } from '..';
import PropTypes from 'prop-types';

function HomePresentational({ isAuthenticated, redirectUser }) {
  return (
    <div>
      {isAuthenticated ? (
        <CreateAd />
      ) : (
        <React.Fragment>
          <div className="hero">
            <section className="landing">
              <div className="landing__title">Real Estate</div>
              <div className="landing__subtitle">
                Create an agency/user profile and offer your services
              </div>
              <div className="landing__btns">
                <button
                  className="landing__sign-in-btn primary-button"
                  name="signin"
                  onClick={redirectUser}
                >
                  Sign In
                </button>
                <button
                  className="landing__sign-up-btn primary-button"
                  name="signup"
                  onClick={redirectUser}
                >
                  Sign Up
                </button>
              </div>
            </section>
          </div>
        </React.Fragment>
      )}
    </div>
  );
}

HomePresentational.propTypes = {
  redirectUser: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};

export default HomePresentational;
