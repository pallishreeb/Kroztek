/** @format */

import "../css/Navbar.css";

import React, { useState, useEffect } from "react";
import {
  MenuOutlined,
  MailOutlined,
  CloseOutlined,
  AppstoreOutlined,
  ContainerOutlined
} from "@ant-design/icons";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  const menusLoggedIn = [

    {
      path: "/products",
      icon: <AppstoreOutlined className="icon" />,
      name: "Products",
    },
  {
      path: "/category",
      icon: <ContainerOutlined className="icon" />,
      name: "Categories",
    },
    {
      path: "/contact",
      icon: <MailOutlined className="icon" />,
      name: "Contact",
    },
  ];
const renderMenusInLargeScreen = () => {
 return menusLoggedIn.map((item) => (
        <div className={"menu-item"}>
          <Link
            to={item.path}
            style={{
              textDecoration: "none",
              color: "inherit",
            }}
          >
            {item.icon}
            <span className="menu-text">{item.name}</span>
          </Link>
        </div>
      ));
  };
  const renderMenusInSmallScreen = () => {

      return menusLoggedIn.map((item) => (
        <div className={"menu-item-vertical"}>
          <Link
            to={item.path}
            style={{
              textDecoration: "none",
              color: "inherit",
            }}
          >
            {item.icon}
            <span className="menu-text">{item.name}</span>
          </Link>
        </div>
      ));
   
  };
  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };


  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 900);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <header className="navbar">
      <div className="navbar-content">
        <Link to={"/"}>
          <div className="logo">KROZTEK INTEGRATED SOLUTION</div>
        </Link>

        {isSmallScreen ? (
          <div className="menu-icon" onClick={toggleMenu}>
            {menuVisible ? (
              <CloseOutlined className="icon" />
            ) : (
              <MenuOutlined className="icon" />
            )}
          </div>
        ) : (
          <nav className="menu">
            {/* <div className="search">
              <input
                type="text"
                placeholder="Search"
                className="search-input"
                onChange={(e) => handleSearch(e)}
              />
              <SearchOutlined className="search-icon" />
            </div> */}

            <div className="menu-items">
            
              {renderMenusInLargeScreen()}
          
            </div>
          </nav>
        )}
      </div>
      {menuVisible && isSmallScreen && (
        <nav className="mobile-menu">
          <div className="menu-items-vertical">
      
            {renderMenusInSmallScreen()}
          </div>
        </nav>
      )}
    </header>
  );
};

export default Navbar;
