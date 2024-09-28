import React, { useEffect, useState } from 'react';
import List from '../components/Dashboard/List';

const WatchlistPage = () => {
  const [watchlistCoins, setWatchlistCoins] = useState([]);

  useEffect(() => {
    // Fetch the watchlist from localStorage
    const savedWatchlist = localStorage.getItem('watchlist');
    if (savedWatchlist) {
      const watchlistIds = JSON.parse(savedWatchlist);
      fetchCoinsData(watchlistIds);
    } else {
      setWatchlistCoins([]); // No coins in the watchlist
    }
  }, []);

  const fetchCoinsData = async (coinIds) => {
    if (coinIds.length === 0) return; // No coins to fetch
    try {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${coinIds.join(',')}`
      );
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setWatchlistCoins(data);
    } catch (error) {
      console.error('Error fetching watchlist coins:', error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Watchlist</h1>
      {watchlistCoins.length > 0 ? (
        <List coins={watchlistCoins} />
      ) : (
        <p>No coins in your watchlist.</p>
      )}
    </div>
  );
};

export default WatchlistPage;
