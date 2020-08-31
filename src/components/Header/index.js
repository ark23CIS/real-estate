import React, { Fragment } from "react";
import SearchIcon from "@material-ui/icons/Search";
import { FaBars } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { Link } from "react-router-dom";
import { DrawerData } from "./DrawerData";
import { IconContext } from "react-icons";
import "./header.scss";

function Header() {
  const [isRegistered, setIsRegistered] = React.useState(false);
  const [isActive, setIsActive] = React.useState(false);
  const toggleDrawer = React.useCallback(() => {
    setIsActive(!isActive);
  }, [isActive]);
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
              <input type="text" />
            </div>
          </div>
        </div>
        <nav className={isActive ? "nav-menu active" : "nav-menu"}>
          <ul className="nav-menu__items" onClick={toggleDrawer}>
            <li className="navbar-toggler">
              <Link to="/">
                <AiOutlineClose />
              </Link>
            </li>
            {DrawerData.filter((item) => item.logged !== !isRegistered).map(
              (item, index) => {
                return (
                  <li key={`${index} ${item.path}`} className="nav-text">
                    <Link to={item.path}>
                      {item.icon}
                      <span>{item.title}</span>
                    </Link>
                  </li>
                );
              }
            )}
          </ul>
        </nav>
      </IconContext.Provider>
    </Fragment>
  );
}

export default Header;
