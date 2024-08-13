/** @format */

import "../css/Navbar.css";
import React, { useState, useEffect } from "react";
import { MenuOutlined, CloseOutlined, ShoppingCartOutlined,UserOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
// import CategoryDropdown from "./CategoryDropdown";
import ProfileDropdown from "./ProfileDropdown";
// import FormDropdown from "./FormDropdown";
import { useAuthApi } from '../context/authState';  // Adjust path if necessary

const Navbar = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const { isAuthenticated,cart } = useAuthApi();
  useEffect(() => {
    setCartCount(cart?.length || 0);
}, [cart]);
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

  useEffect(() => {
    // Load cart count from localStorage
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    // setCartCount(cartItems.reduce((total, item) => total + item.quantity, 0));
    setCartCount(cartItems.length || 0);
  }, []);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };


  // const renderMenusInLargeScreen = () => {
  //   return [
  //     { path: "/services", name: "Services" }
  //   ].map((item) => (
  //     <div className="menu-item" key={item.path}>
  //       <Link to={item.path} style={{ textDecoration: "none", color: "inherit" }}>
  //         <span className="menu-text">{item.name}</span>
  //       </Link>
  //     </div>
  //   ));
  // };

  // const renderMenusInSmallScreen = () => {
  //   return [
  //     { path: "/services", name: "Services" }
  //   ].map((item) => (
  //     <div className="menu-item-vertical" key={item.path}>
  //       <Link to={item.path} style={{ textDecoration: "none", color: "inherit" }}>
  //         <span className="menu-text">{item.name}</span>
  //       </Link>
  //     </div>
  //   ));
  // };

  return (
    <header className="navbar">
      <div className="navbar-content">
        <Link to="/">
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
            <div className="menu-items">
              {/* <div className="menu-item">
                <CategoryDropdown />
              </div> */}
              {/* {renderMenusInLargeScreen()} */}
              {/* <div className="menu-item">
                <FormDropdown />
              </div> */}
              {isAuthenticated && (
                <div className="menu-item">
                  <ProfileDropdown />
                </div>
              )}

              <div className="menu-item">
              <Link to="/cart" className="menu-text flex items-center">
               My Cart {" "} <ShoppingCartOutlined className="text-2xl" />
              {cartCount > 0 && <span className="ml-2 bg-red-500 text-white rounded-full px-2">{cartCount}</span>}
               </Link>
              </div>

              {!isAuthenticated && (
                <div className="menu-item">
                  <Link to="/login" className="menu-text">Login {" "} <UserOutlined className="text-xl"/></Link>
                </div>
              )}
              
            </div>
          </nav>
        )}
      </div>
      {menuVisible && isSmallScreen && (
        <nav className="mobile-menu">
          <div className="menu-items-vertical">
            {/* <div className="menu-item">
              <CategoryDropdown />
            </div> */}
            {/* {renderMenusInSmallScreen()} */}
            {/* <div className="menu-item">
              <FormDropdown />
            </div> */}
            {isAuthenticated && (
              <div className="menu-item">
                <ProfileDropdown />
              </div>
            )}

            <div className="menu-item">
              <Link to="/cart" className="flex items-center">
                My Cart {" "} <ShoppingCartOutlined className="text-xl" />
                {cartCount > 0 && (
                  <span className="ml-2 bg-red-500 text-white rounded-full px-2 py-1 text-sm">{cartCount}</span>
                )}
              </Link>
            </div>
            
            {!isAuthenticated && (
            //   <div className="menu-item">
            //     <button onClick={logout}>Logout</button>
            //   </div>
            // ) : (
              <div className="menu-item">
                <Link to="/login" className="menu-text">Login {" "} <UserOutlined className="text-xl"/></Link>
              </div>
            )}
          </div>
        </nav>
      )}
    </header>
  );
};

export default Navbar;
