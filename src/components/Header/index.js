import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import HeaderPresentational from './HeaderPresentational';
import { logout } from '../../redux/actions';
import './header.scss';

function HeaderContainer() {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [isActive, setIsActive] = React.useState(false);

  const toggleDrawer = React.useCallback(() => {
    setIsActive(!isActive);
  }, [isActive]);

  const onHeaderItemClick = React.useCallback(() => {
    dispatch(logout());
  });

  return (
    <HeaderPresentational
      onHeaderItemClick={onHeaderItemClick}
      toggleDrawer={toggleDrawer}
      isAuthenticated={isAuthenticated}
      isActive={isActive}
    />
  );
}

export default HeaderContainer;
