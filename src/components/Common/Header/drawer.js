import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import { IconButton, Switch } from "@mui/material";
import Drawer from "@mui/material/Drawer";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function TemporaryDrawer() {
  const [open, setOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    if (darkMode) {
      setDark();
    } else {
      setDark();
    }
  }, [darkMode]);

  const changeMode = () => {
    if (darkMode) {
      setDark();
    } else {
      setDark();
    }
    setDarkMode(!darkMode);
    toast.success("Theme Changed!");
  };

  const setDark = () => {
    localStorage.setItem("theme", "dark");
    document.documentElement.setAttribute("data-theme", "dark");
  };

  // const setDark = () => {
  //   localStorage.setItem("theme", "light");
  //   document.documentElement.setAttribute("data-theme", "light");
  // };

  return (
    <div>
      <IconButton 
        onClick={() => setOpen(true)} 
        className="text-blue-500 dark:text-blue-300 p-2"
      >
        <MenuRoundedIcon />
      </IconButton>
      <Drawer 
        anchor="right" 
        open={open} 
        onClose={() => setOpen(false)} 
        PaperProps={{
          sx: {
            width: 250,
            backgroundColor: darkMode ? '#1F2937' : '#F9FAFB',
            color: darkMode ? '#E5E7EB' : '#111827',
            display: 'flex',
            flexDirection: 'column',
            padding: 2,
            gap: 2,
          }
        }}
      >
        <div className="flex flex-col h-full">
          <a href="/" className="text-lg font-semibold hover:underline dark:text-blue-400">
            Home
          </a>
          <a href="/compare" className="text-lg font-semibold hover:underline dark:text-blue-400">
            Compare
          </a>
          <a href="/watchlist" className="text-lg font-semibold hover:underline dark:text-blue-400">
            Watchlist
          </a>
          <a href="/dashboard" className="text-lg font-semibold hover:underline dark:text-blue-400">
            Dashboard
          </a>
          <div className="mt-auto flex items-center space-x-4">
            <span className="text-sm font-medium">Dark Mode</span>
            <Switch 
              checked={darkMode} 
              onChange={changeMode} 
              color="primary" 
            />
          </div>
        </div>
      </Drawer>
    </div>
  );
}
