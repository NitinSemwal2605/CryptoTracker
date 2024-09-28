import React from 'react';
import './styles.css'; // Ensure this file contains the styles provided below

const Banner = () => {
  return (
    <div className="banner-container">
      <div className="banner">
        📣 Real-Time, In-Depth Insights for Over 500&nbsp;
        <a
          href="https://nitinsemwal.vercel.app"
          target="_blank"
          rel="noopener noreferrer"
          className="banner-link"
        >
           Cryptocurrencies 
        </a>
        <button className="close-button">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="icon"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Banner;
