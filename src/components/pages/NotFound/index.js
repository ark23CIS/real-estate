import React from 'react';
import { Link } from 'react-router-dom';
import Banner from '../../Banner';

function NotFound() {
  return (
    <div className="centralizeBanner">
      <Banner title="404" subtitle="page not found">
        <Link to="/" className="primary-button">
          return home
        </Link>
      </Banner>
    </div>
  );
}

export default NotFound;
