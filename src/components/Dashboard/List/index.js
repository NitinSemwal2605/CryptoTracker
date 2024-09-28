import StarBorderRounded from '@mui/icons-material/StarBorderRounded';
import StarRounded from '@mui/icons-material/StarRounded';
import TrendingDownRounded from '@mui/icons-material/TrendingDownRounded';
import TrendingUpRounded from '@mui/icons-material/TrendingUpRounded';
import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const List = ({ coins }) => {
  const [watchlist, setWatchlist] = useState(new Set());

  // Load the watchlist from localStorage when the component mounts
  useEffect(() => {
    const savedWatchlist = localStorage.getItem('watchlist');
    if (savedWatchlist) {
      setWatchlist(new Set(JSON.parse(savedWatchlist)));
    }
  }, []); // This ensures it only runs once when the component is first mounted

  // Sync the watchlist with localStorage whenever it updates
  useEffect(() => {
    localStorage.setItem('watchlist', JSON.stringify([...watchlist]));
  }, [watchlist]);

  const handleWatchlistToggle = (coinId) => {
    setWatchlist((prev) => {
      const updated = new Set(prev);
      if (updated.has(coinId)) {
        updated.delete(coinId);
        toast.info('Removed from watchlist');
      } else {
        updated.add(coinId);
        toast.success('Added to watchlist');
      }
      return updated;
    });
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full w-full text-left border-separate border-spacing-y-2">
        <tbody>
          {coins.map((coin) => {
            const isNegativeChange = coin.price_change_percentage_24h < 0;
            const isWatchlisted = watchlist.has(coin.id);

            return (
              <tr
                key={coin.id}
                className="bg-gray-700 hover:bg-gray-700 rounded-lg transition duration-200"
                style={{ backgroundColor: 'var(--darkgrey)' }}
              >
                <td className="p-2 md:p-4 flex items-center gap-2 md:gap-4">
                  <img
                    src={coin.image || 'default-image-url.png'}
                    alt={coin.symbol}
                    className="w-6 h-6 md:w-8 md:h-8 rounded-full"
                  />
                  <span className="text-white font-medium text-xs md:text-sm">
                    {coin.name}
                  </span>
                </td>

                <td className="p-2 md:p-4 text-white text-right text-xs md:text-sm">
                  ${coin.current_price?.toLocaleString() || 'N/A'}
                </td>

                <td
                  className={`p-2 md:p-4 text-right flex items-center gap-1 text-xs md:text-sm ${
                    isNegativeChange ? 'text-red-500' : 'text-green-500'
                  }`}
                >
                  {isNegativeChange ? (
                    <TrendingDownRounded style={{ color: '#f44336' }} />
                  ) : (
                    <TrendingUpRounded style={{ color: '#4caf50' }} />
                  )}
                  {coin.price_change_percentage_24h?.toFixed(2) || 'N/A'}%
                </td>

                <td className="hidden sm:table-cell p-2 md:p-4 text-white text-right text-xs md:text-sm">
                  <span className="hidden md:inline text-xs text-gray-400">
                    Volume:
                  </span>
                  ${coin.total_volume?.toLocaleString() || 'N/A'}
                </td>

                <td className="hidden sm:table-cell p-2 md:p-4 text-white text-right text-xs md:text-sm">
                  <span className="hidden md:inline text-xs text-gray-400">
                    Market Cap:
                  </span>
                  ${coin.market_cap?.toLocaleString() || 'N/A'}
                </td>

                <td className="p-2 md:p-4 text-right">
                  <button
                    onClick={() => handleWatchlistToggle(coin.id)}
                    className={`text-xl ${
                      isWatchlisted ? 'text-yellow-500' : 'text-gray-400'
                    } transition-colors duration-300`}
                  >
                    {isWatchlisted ? <StarRounded /> : <StarBorderRounded />}
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <ToastContainer />
    </div>
  );
};

export default List;
