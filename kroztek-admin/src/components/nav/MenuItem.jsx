/** @format */

import React from "react";
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import {
  FeaturedPlayList,
  Home,
  NoteAdd,
  ListAlt,
  Category,
  Logout,
  Groups2,
} from "@mui/icons-material";
import { AuthApiProvider } from "../../context/auth/AuthProvider";
const MenuItem = ({ open, navigate }) => {
  const { logout } = AuthApiProvider();
  const data = [
    {
      name: "Dashboard",
      icon: <Home color="white" />,
      path: "/",
    },
    {
      name: "Add Blogs",
      icon: <NoteAdd />,
      path: "/add",
    },
    {
      name: "Blogs",
      icon: <FeaturedPlayList color="white" />,
      path: "/posts",
    },

    {
      name: "Users",
      icon: <Groups2 color="white" />,
      path: "/users",
    },
    {
      name: "Categories",
      icon: <Category color="white" />,
      path: "/categories",
    },
    {
      name: "Metadata",
      icon: <ListAlt color="white" />,
      path: "/showmetadata",
    },
    {
      name: "Logout",
      icon: <Logout color="white" />,
      path: "/logout",
    },
  ];
  const handleNavigate = (path) => {
    if (path === "/logout") {
      logout();
      navigate("/login");
    } else {
      navigate(`${path}`);
    }
  };
  return (
    <div>
      {data.map((item, index) => (
        <ListItem
          key={index}
          // disablePadding
          sx={{ display: "block" }}
          onClick={() => handleNavigate(item.path)}
        >
          <ListItemButton
            sx={{
              minHeight: 48,
              justifyContent: open ? "initial" : "center",
              px: 2.5,
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 3 : "auto",
                justifyContent: "center",
                color: "tan",
              }}
            >
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.name} sx={{ opacity: open ? 1 : 0 }} />
          </ListItemButton>
        </ListItem>
      ))}
    </div>
  );
};

export default MenuItem;
