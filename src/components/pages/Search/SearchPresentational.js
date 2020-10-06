import React from 'react';
import { Ads, SearchBar, Pagination, Filters } from '../..';
import { Container } from '@material-ui/core';
import PropTypes from 'prop-types';

function SearchPresentational({ changeFilterData, searchPostsData, renters, estates, profile }) {
  return (
    <div>
      <SearchBar callback={changeFilterData} />
      <Container className="wrapper">
        <Filters {...searchPostsData} callback={changeFilterData} />
        <Ads
          cards={[
            ...(searchPostsData.AdType === 'renters'
              ? renters
              : estates.filter((estate) => estate.visible)
            ).slice(
              searchPostsData.postsPerPage * (searchPostsData.activePage - 1),
              searchPostsData.postsPerPage * searchPostsData.activePage,
            ),
          ]}
          profile={profile ? profile : ''}
          needToRenderBanner={true}
        />
        <Pagination
          callback={changeFilterData}
          postsPerPage={searchPostsData.postsPerPage}
          totalPosts={
            searchPostsData.AdType === 'renters'
              ? renters.length
              : estates.filter((estate) => estate.visible).length
          }
        />
      </Container>
    </div>
  );
}

SearchPresentational.propTypes = {
  changeFilterData: PropTypes.func.isRequired,
  searchPostsData: PropTypes.object.isRequired,
  renters: PropTypes.arrayOf(PropTypes.object).isRequired,
  estates: PropTypes.arrayOf(PropTypes.object).isRequired,
  profile: PropTypes.object.isRequired,
};

export default SearchPresentational;
