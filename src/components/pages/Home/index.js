import React from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { CreateAd } from '..';
import './home.scss';

function Home() {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [shouldBeRedirected, setShouldBeRedirected] = React.useState(false);

  const redirectUser = React.useCallback(
    (e) => {
      const path = `/${e.target.name}`;
      setShouldBeRedirected((shouldBeRedirected) => ({
        redirect: !shouldBeRedirected,
        path,
      }));
    },
    [shouldBeRedirected],
  );

  if (shouldBeRedirected.path) {
    return <Redirect to={shouldBeRedirected.path} />;
  }
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

export default React.memo(Home);
