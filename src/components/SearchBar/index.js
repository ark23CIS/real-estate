import React from 'react';
import { Search } from '@material-ui/icons';
import './search.scss';

function index({ callback, searchQuery }) {
  return (
    <div className="search-bar">
      <div className="search-bar__content">
        <input
          type="text"
          spellcheck="false"
          placeholder="Search ad"
          onChange={(e) => callback('searchQuery', e.target.value)}
          value={searchQuery}
        />
      </div>
    </div>
  );
}

export default index;
