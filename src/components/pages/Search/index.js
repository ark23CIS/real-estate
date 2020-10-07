import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { debounce } from 'lodash';
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
    return () => {
      changeFilterData.cancel();
    };
  }, [dispatch, searchPostsData]);

  const changeFilterData = debounce(
    React.useCallback(
      (name, value) => {
        if (name) setSearchPostsData((searchData) => ({ ...searchData, [name]: value }));
      },
      [setSearchPostsData],
    ),
    1000,
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
