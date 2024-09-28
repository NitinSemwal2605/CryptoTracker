import { MenuItem, Select } from "@mui/material";
import axios from "axios";
import { CategoryScale, Chart, Legend, LinearScale, LineElement, PointElement, Title, Tooltip } from 'chart.js';
import DOMPurify from "dompurify";
import React, { useEffect, useState } from "react";
import { Line } from 'react-chartjs-2';
import Loader from "../../Common/Loader";

Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const fetchCoins = async () => {
  try {
    const response = await axios.get(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching coins:", error);
    return [];
  }
};

const fetchCoinDetails = async (id) => {
  try {
    const response = await axios.get(
      `https://api.coingecko.com/api/v3/coins/${id}`
    );
    return response.data;
  } catch (error) {
    console.error(`Error fetching details for coin ${id}:`, error);
    return null;
  }
};

const fetchCoinPriceHistory = async (id, days = 30) => {
  try {
    const response = await axios.get(
      `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=${days}`
    );
    return response.data.prices; // returns array of [timestamp, price] pairs
  } catch (error) {
    console.error(`Error fetching price history for coin ${id}:`, error);
    return [];
  }
};

const SelectCoinsPage = () => {
  const [allCoins, setAllCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [crypto1, setCrypto1] = useState('');
  const [crypto2, setCrypto2] = useState('');
  const [coinDetails, setCoinDetails] = useState({});
  const [coinHistory, setCoinHistory] = useState({});
  const [expandedCoin1, setExpandedCoin1] = useState(false);
  const [expandedCoin2, setExpandedCoin2] = useState(false);
  const [timeRange, setTimeRange] = useState(30); // Default to 1 month

  useEffect(() => {
    const getCoins = async () => {
      const coins = await fetchCoins();
      setAllCoins(coins);
      setLoading(false);
    };

    getCoins();
  }, []);

  useEffect(() => {
    const getCoinDetails = async () => {
      if (crypto1) {
        const details1 = await fetchCoinDetails(crypto1);
        const history1 = await fetchCoinPriceHistory(crypto1, timeRange);
        setCoinDetails((prev) => ({ ...prev, [crypto1]: details1 }));
        setCoinHistory((prev) => ({ ...prev, [crypto1]: history1 }));
      }

      if (crypto2) {
        const details2 = await fetchCoinDetails(crypto2);
        const history2 = await fetchCoinPriceHistory(crypto2, timeRange);
        setCoinDetails((prev) => ({ ...prev, [crypto2]: details2 }));
        setCoinHistory((prev) => ({ ...prev, [crypto2]: history2 }));
      }
    };

    if (crypto1 || crypto2) {
      getCoinDetails();
    }
  }, [crypto1, crypto2, timeRange]);

  const handleChange = (e, isCrypto2) => {
    const selectedCoin = e.target.value;
    if (isCrypto2) {
      setCrypto2(selectedCoin);
    } else {
      setCrypto1(selectedCoin);
    }
  };

  const handleTimeRangeChange = (e) => {
    setTimeRange(e.target.value);
  };

  const handleToggleExpand = (coinId) => {
    if (coinId === crypto1) {
      setExpandedCoin1((prev) => !prev);
    } else if (coinId === crypto2) {
      setExpandedCoin2((prev) => !prev);
    }
  };

  const chartData = {
    labels: coinHistory[crypto1]?.map(([timestamp]) => {
      const date = new Date(timestamp);
      return `${date.getMonth() + 1}/${date.getDate()}`; // Format MM/DD
    }),
    datasets: [
      {
        label: coinDetails[crypto1]?.name || 'Coin 1',
        data: coinHistory[crypto1]?.map(([, price]) => price),
        borderColor: 'rgba(255, 99, 132, 1)', // Red for Coin 1
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        fill: false,
        tension: 0.4, // Makes the line curved
        borderWidth: 2,
        pointRadius: 0, // Remove points from the graph for a cleaner look
      },
      {
        label: coinDetails[crypto2]?.name || 'Coin 2',
        data: coinHistory[crypto2]?.map(([, price]) => price),
        borderColor: 'rgba(54, 162, 235, 1)', // Blue for Coin 2
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        fill: false,
        tension: 0.4, // Makes the line curved
        borderWidth: 2,
        pointRadius: 0, // Remove points from the graph for a cleaner look
      },
    ],
  };
  
  const chartOptions = {
    responsive: true,
    scales: {
      x: {
        title: { display: true, text: 'Date' },
        ticks: {
          autoSkip: true,
          maxTicksLimit: 10,
          callback: function (value, index, values) {
            const days = coinHistory[crypto1]?.length || 0;
  
            if (timeRange === 7) {
              return this.getLabelForValue(value);
            }
  
            if (timeRange === 30) {
              if (index % 3 === 0 || index === values.length - 1) {
                return this.getLabelForValue(value);
              }
            }
  
            if (timeRange === 180) {
              if (index % 7 === 0 || index === values.length - 1) {
                return this.getLabelForValue(value);
              }
            }
  
            return this.getLabelForValue(value);
          },
          maxRotation: 0,
          minRotation: 0,
        },
      },
      y: {
        title: { display: true, text: 'Price (USD)' },
      },
    },
    elements: {
      line: {
        tension: 0.4, // Apply curve to all lines by default (for safety)
      },
    },
  };
  

  if (loading) {
    return (
      <div className="text-center text-white">
        <Loader />
      </div>
    );
  }

  const sanitizeDescription = (desc) => DOMPurify.sanitize(desc);

  const getShortDescription = (desc) => {
    const shortTextLimit = 300;
    return desc.length > shortTextLimit
      ? desc.slice(0, shortTextLimit) + "..."
      : desc;
  };

  return (
    <div className="flex flex-col items-center p-6 min-h-screen">
      <div className="flex flex-col gap-6 mb-6 w-full max-w-5xl">
        <div className="w-full">
          <p className="text-lg font-semibold mb-2 text-center text-white">
            Select Cryptocurrency 1
          </p>
          <Select
            value={crypto1}
            onChange={(e) => handleChange(e, false)}
            className="w-full bg-gray-800 text-white border border-gray-600 rounded-lg"
            displayEmpty
          >
            {allCoins.length > 0 ? (
              allCoins
                .filter((coin) => coin.id !== crypto2)
                .map((coin) => (
                  <MenuItem value={coin.id} key={coin.id}>
                    {coin.name}
                  </MenuItem>
                ))
            ) : (
              <MenuItem disabled>No Coins Available</MenuItem>
            )}
          </Select>
        </div>

        <div className="w-full">
          <p className="text-lg font-semibold mb-2 text-center text-white">
            Select Cryptocurrency 2
          </p>
          <Select
            value={crypto2}
            onChange={(e) => handleChange(e, true)}
            className="w-full bg-gray-800 text-white border border-gray-600 rounded-lg"
            displayEmpty
          >
            {allCoins.length > 0 ? (
              allCoins
                .filter((coin) => coin.id !== crypto1)
                .map((coin) => (
                  <MenuItem value={coin.id} key={coin.id}>
                    {coin.name}
                  </MenuItem>
                ))
            ) : (
              <MenuItem disabled>No Coins Available</MenuItem>
            )}
          </Select>
        </div>
      </div>

      {/* Time Range Selection */}
      <div className="w-full max-w-5xl mb-6">
        <p className="text-lg font-semibold text-center text-white">Select Time Range</p>
        <Select
          value={timeRange}
          onChange={handleTimeRangeChange}
          className="w-full bg-gray-800 text-white border border-gray-600 rounded-lg"
        >
          <MenuItem value={7}>7 Days</MenuItem>
          <MenuItem value={30}>1 Month</MenuItem>
          <MenuItem value={180}>6 Months</MenuItem>
        </Select>
      </div>

      {/* Coin Descriptions */}
      <div className="flex flex-col md:flex-row gap-6 w-full max-w-5xl">
        <div className="w-full md:w-1/2">
          <p className="text-lg font-semibold mb-2 text-center text-white">
            Selected Coin 1 Description
          </p>
          <div className="bg-gray-800 text-white border border-gray-600 rounded-lg p-4 h-full">
            {coinDetails[crypto1] ? (
              <div className="overflow-hidden">
                <h2 className="text-xl font-semibold">{coinDetails[crypto1].name}</h2>
                <p
                  className="mt-2"
                  dangerouslySetInnerHTML={{
                    __html: expandedCoin1
                      ? sanitizeDescription(coinDetails[crypto1].description.en)
                      : sanitizeDescription(getShortDescription(coinDetails[crypto1].description.en)),
                  }}
                ></p>
                <button
                  onClick={() => handleToggleExpand(crypto1)}
                  className="text-blue-400 underline mt-2"
                >
                  {expandedCoin1 ? "Show Less" : "Read More"}
                </button>
              </div>
            ) : (
              <p>No coin selected yet.</p>
            )}
          </div>
        </div>

        <div className="w-full md:w-1/2">
          <p className="text-lg font-semibold mb-2 text-center text-white">
            Selected Coin 2 Description
          </p>
          <div className="bg-gray-800 text-white border border-gray-600 rounded-lg p-4 h-full">
            {coinDetails[crypto2] ? (
              <div className="overflow-hidden">
                <h2 className="text-xl font-semibold">{coinDetails[crypto2].name}</h2>
                <p
                  className="mt-2"
                  dangerouslySetInnerHTML={{
                    __html: expandedCoin2
                      ? sanitizeDescription(coinDetails[crypto2].description.en)
                      : sanitizeDescription(getShortDescription(coinDetails[crypto2].description.en)),
                  }}
                ></p>
                <button
                  onClick={() => handleToggleExpand(crypto2)}
                  className="text-blue-400 underline mt-2"
                >
                  {expandedCoin2 ? "Show Less" : "Read More"}
                </button>
              </div>
            ) : (
              <p>No coin selected yet.</p>
            )}
          </div>
        </div>
      </div>

      {/* Line Chart for comparison */}
      <div className="w-full max-w-5xl mt-8">
        {crypto1 && crypto2 && (
          <div className="bg-gray-800 text-white border border-gray-600 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-center mb-6">Price Comparison Over Selected Period</h2>
            <Line data={chartData} options={chartOptions} />
          </div>
        )}
      </div>
    </div>
  );
};

export default SelectCoinsPage;
