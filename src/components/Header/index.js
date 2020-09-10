import React, { Fragment } from "react";
import SearchIcon from "@material-ui/icons/Search";
import { FaBars } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { AiOutlineClose } from "react-icons/ai";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
import { DrawerData } from "./DrawerData";
import { logout } from "../../redux/actions";
import { IconContext } from "react-icons";
import "./header.scss";

const Header = React.memo(({ location }) => {
  const dispatch = useDispatch();
  const { isAuthenticated, loading } = useSelector((state) => state.auth);
  const [isActive, setIsActive] = React.useState(false);
  const toggleDrawer = React.useCallback(() => {
    setIsActive(!isActive);
  }, [isActive]);
  const onClick = React.useCallback(() => {
    dispatch(logout());
  });
  return (
    <Fragment>
      <IconContext.Provider value={{ color: "#fff" }}>
        <div className="header">
          <div className="header__left">
            <Link to="#" className="menu-bars">
              <FaBars onClick={toggleDrawer} />
            </Link>
            <div className="header__logo">Real Estate</div>
          </div>
          <div className="header__right">
            <div className="header__input">
              <SearchIcon />
              <input type="text" placeholder="Search" />
            </div>
          </div>
        </div>
        <nav className={isActive ? "nav-menu active" : "nav-menu"}>
          <ul className="nav-menu__items" onClick={toggleDrawer}>
            <li className="navbar-toggler">
              <Link to="#">
                <AiOutlineClose />
              </Link>
            </li>
            {DrawerData.filter(
              (item) => item.logged !== !isAuthenticated && !loading
            ).map((item, index) => {
              return (
                <li
                  key={`${index} ${item.path}`}
                  className={`nav-text`}
                  onClick={item.title === "Log out" ? onClick : undefined}
                >
                  <Link
                    to={item.path}
                    className={
                      location.pathname === item.path ? "active-page" : ""
                    }
                  >
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </IconContext.Provider>
    </Fragment>
  );
});

export default withRouter(React.memo(Header));
