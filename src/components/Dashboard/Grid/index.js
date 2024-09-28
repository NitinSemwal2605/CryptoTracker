import TrendingDownRounded from "@mui/icons-material/TrendingDownRounded";
import TrendingUpRounded from "@mui/icons-material/TrendingUpRounded";
import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook from React Router
import "./styles.css"; // Link to your CSS file

// SVG Icons for Total Volume and Market Cap
const VolumeIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="#777"
    className="icon icon-volume"
    style={{ width: "16px", height: "16px", marginRight: "5px" }}
  >
    <path d="M6 9v6h4l5 5V4l-5 5H6z" />
  </svg>
);

const MarketCapIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="#777"
    className="icon icon-market-cap"
    style={{ width: "16px", height: "16px", marginRight: "5px" }}
  >
    <path d="M12 2l8 8h-6v8h-4v-8H4z" />
  </svg>
);

function Grid({ coin }) {
  const isNegativeChange = coin.price_change_percentage_24h < 0;
  const navigate = useNavigate(); // Initialize navigate hook

  // Function to handle grid click and navigate to the coin details page
  const handleGridClick = () => {
    navigate(`/coin/${coin.id}`); // Navigate to the specific coin page using its ID
  };

  return (
    <div className="grid-container" onClick={handleGridClick} style={{ cursor: "pointer" }}> {/* Add onClick handler */}
      <div className="info-flex">
        <img src={coin.image} alt={coin.symbol} className="coin-image" />
        <div className="name-col">
          <p className="coin-symbol">{coin.symbol.toUpperCase()}</p>
          <p className="coin-name">{coin.name}</p>
        </div>
      </div>
      <div className="chip-flex">
        <div className={`price-chip ${isNegativeChange ? "red" : ""}`}>
          {coin.price_change_percentage_24h.toFixed(2)} %
        </div>
        <div className={`chip-icon ${isNegativeChange ? "red" : ""}`}>
          {isNegativeChange ? (
            <TrendingDownRounded style={{ color: "#f44336" }} />
          ) : (
            <TrendingUpRounded style={{ color: "#4caf50" }} />
          )}
        </div>
      </div>
      <p className={`current-price ${isNegativeChange ? "red" : ""}`}>
        ${coin.current_price.toLocaleString()}
      </p>
      <div className="coin-stats">
        <div className="stat-item">
          <span>Total Volume: </span>
          <span className="stat-value">
            ${coin.total_volume.toLocaleString()}
          </span>
        </div>
        <div className="stat-item">
          <span>Market Cap: </span>
          <span className="stat-value">
            ${coin.market_cap.toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
}

export default Grid;
