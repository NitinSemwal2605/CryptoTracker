import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../Button";
import TemporaryDrawer from "./drawer";
import "./styles.css";

const Header = () => {
  const navigate = useNavigate();

  // Handle Watchlist click (simply navigate to watchlist)
  const handleWatchlistClick = () => {
    navigate('/watchlist');
  };

  // Handle Dashboard navigation
  const handleDashboardClick = () => {
    navigate('/dashboard');
  };

  return (
    <div className="header">
      <h1 style={{ fontSize: "30px", color: "var(--blue)" }}>
        Crypto<span>Tracker.</span>
      </h1>

      <div className="links">
        <Link to="/">
          <p className="link">Home</p>
        </Link>
        <Link to="/compare">
          <p className="link">Compare</p>
        </Link>
        <p className="link" onClick={handleWatchlistClick}>
          Watchlist
        </p>
        <Button text="Dashboard" className="dashboard1" onClick={handleDashboardClick} />
      </div>

      <div className="drawer-component">
        <TemporaryDrawer />
      </div>
    </div>
  );
};

export default Header;
