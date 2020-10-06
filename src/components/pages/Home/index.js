import React from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import HomePresentational from './HomePresentational';
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
  return <HomePresentational isAuthenticated={isAuthenticated} redirectUser={redirectUser} />;
}

export default React.memo(Home);
