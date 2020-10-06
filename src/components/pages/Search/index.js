import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchAds, getProfile, getAllEstates } from '../../../redux/actions';
import SearchPresentational from './SearchPresentational';
import './search-page.scss';

function SearchContainer() {
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
    dispatch(getProfile());
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

  return (
    <SearchPresentational
      changeFilterData={changeFilterData}
      searchPostsData={searchPostsData}
      renters={renters}
      estates={estates}
      profile={profile}
    />
  );
}

export default React.memo(SearchContainer);
