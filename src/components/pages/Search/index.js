import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Ads, SearchBar, Pagination, Filters } from '../..';
import { searchAds, getProfile, getAllEstates } from '../../../redux/actions';
import { Container } from '@material-ui/core';
import './search-page.scss';

function Search() {
  const dispatch = useDispatch();

  const {
    estate: { estates },
    renter: { renters },
    profile: { profile },
  } = useSelector((state) => state);

  const [searchPostsData, setSearchPostsData] = React.useState({
    postsPerPage: 6,
    activePage: 1,
    sortBy: 'price',
    minFootage: 0,
    maxFootage: 500,
    minPrice: 0,
    maxPrice: 500,
    AdType: 'estates',
    searchQuery: '',
  });

  React.useEffect(() => {
    dispatch(getAllEstates());
  }, [dispatch]);

  React.useEffect(() => {
    dispatch(searchAds(searchPostsData));
  }, [dispatch, searchPostsData]);

  const changeFilterData = React.useCallback(
    (name, value) => {
      if (name && value) setSearchPostsData((searchData) => ({ ...searchData, [name]: value }));
    },
    [setSearchPostsData],
  );

  console.log(searchPostsData);

  return (
    <React.Fragment>
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
    </React.Fragment>
  );
}

export default React.memo(Search);
