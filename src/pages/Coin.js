import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import axios from 'axios';
import DOMPurify from "dompurify";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LineChart from "../components/Coin/LineChart";
import BasicSelect from "../components/Coin/SelectDays";
import Loader from "../components/Common/Loader";
import List from "../components/Dashboard/List";

function CoinPage() {
  const { coinID } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [coin, setCoin] = useState(null);
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });
  const [days, setDays] = useState(7);
  const [priceType, setPriceType] = useState("prices");
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchCoinData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${coinID}`);
        const data = response.data;
        setCoin(formatCoinData(data));
      } catch (err) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };

    if (coinID) {
      fetchCoinData();
    }
  }, [coinID]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let url = '';
        switch (priceType) {
          case "prices":
          case "market_cap":
          case "total_volume":
            url = `https://api.coingecko.com/api/v3/coins/${coinID}/market_chart?vs_currency=usd&days=${days}`;
            break;
          default:
            throw new Error("Invalid price type");
        }
        const response = await axios.get(url);
        const data = response.data;

        let chartData;
        switch (priceType) {
          case "prices":
            chartData = formatChartData(data.prices);
            break;
          case "market_cap":
            chartData = formatChartData(data.market_caps);
            break;
          case "total_volume":
            chartData = formatChartData(data.total_volumes);
            break;
          default:
            throw new Error("Invalid price type");
        }
        setChartData(chartData);
      } catch (err) {
        setError(true);
      }
    };

    if (coinID) {
      fetchData();
    }
  }, [coinID, days, priceType]);

  const formatCoinData = (data) => ({
    id: data.id,
    name: data.name,
    symbol: data.symbol,
    image: data.image.large,
    desc: data.description.en,
    price_change_percentage_24h: data.market_data.price_change_percentage_24h,
    total_volume: data.market_data.total_volume.usd,
    current_price: data.market_data.current_price.usd,
    market_cap: data.market_data.market_cap.usd,
  });

  const formatChartData = (data) => {
    const labels = data.map((entry) => new Date(entry[0]).toLocaleDateString());
    const values = data.map((entry) => entry[1]);

    // Adjust tension based on selected days for smoother curves on longer durations
    let tensionValue = 0.4; // Default tension for shorter periods
    if (days === 30) {
      tensionValue = 0.6; // More curve for 30 days
    } else if (days === 90) {
      tensionValue = 0.8; // Stronger curve for 90 days
    }

    return {
      labels,
      datasets: [
        {
          label: priceType === "prices" ? "Price" : priceType === "market_cap" ? "Market Cap" : "Volume",
          data: values,
          borderColor: "rgba(75,192,192,1)",
          backgroundColor: "rgba(75,192,192,0.2)",
          tension: tensionValue, // Apply dynamic tension value
          fill: true, // Optional: Fill the area under the curve for aesthetics
          pointBackgroundColor: 'rgba(75,192,192,1)',
          pointRadius: 3,
        },
      ],
    };
  };

  const sanitizeDescription = (desc) => ({
    __html: DOMPurify.sanitize(desc),
  });

  const toggleDescription = () => {
    setShowFullDescription((prev) => !prev);
  };

  const getShortDescription = (desc) => {
    const shortTextLimit = 300;
    if (desc.length > shortTextLimit) {
      return desc.slice(0, shortTextLimit) + "...";
    }
    return desc;
  };

  const handlePriceTypeChange = (event, newPriceType) => {
    if (newPriceType !== null) {
      setPriceType(newPriceType);
    }
  };

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-10 bg-trueGray-900 text-gray-100">
      <header>
        {isLoading ? (
          <Loader />
        ) : error ? (
          <div className="text-center text-red-500 font-bold">Error fetching data</div>
        ) : (
          coin && (
            <>
              <div className="mb-8 w-full">
                <List coins={[coin]} />
              </div>
              <div className="flex flex-col items-start gap-6 w-full">
                <BasicSelect onChange={(newDays) => setDays(newDays)} />

                <ToggleButtonGroup
                  value={priceType}
                  exclusive
                  onChange={handlePriceTypeChange}
                  aria-label="Price Type"
                  className="mb-6"
                >
                  <ToggleButton
                    value="prices"
                    aria-label="Price"
                    sx={{
                      borderColor: priceType === "prices" ? 'blue' : 'transparent',
                      '&:hover': { borderColor: 'blue' },
                      color: 'white',
                      backgroundColor: priceType === "prices" ? 'bg-blue-600' : 'bg-transparent',
                    }}
                  >
                    Price
                  </ToggleButton>
                  <ToggleButton
                    value="market_cap"
                    aria-label="Market Cap"
                    sx={{
                      borderColor: priceType === "market_cap" ? 'blue' : 'transparent',
                      '&:hover': { borderColor: 'blue' },
                      color: 'white',
                      backgroundColor: priceType === "market_cap" ? 'bg-blue-600' : 'bg-transparent',
                    }}
                  >
                    Market Cap
                  </ToggleButton>
                  <ToggleButton
                    value="total_volume"
                    aria-label="Volume"
                    sx={{
                      borderColor: priceType === "total_volume" ? 'blue' : 'transparent',
                      '&:hover': { borderColor: 'blue' },
                      color: 'white',
                      backgroundColor: priceType === "total_volume" ? 'bg-blue-600' : 'bg-transparent',
                    }}
                  >
                    Volume
                  </ToggleButton>
                </ToggleButtonGroup>

                <div className="relative shadow-lg rounded-lg p-4 w-full bg-trueGray-900">
                  {/* Ensure chart is fully responsive */}
                  <div className="w-full h-auto">
                    <LineChart chartData={chartData} />
                  </div>
                </div>

                <div className="shadow-lg rounded-lg p-6 w-full bg-trueGray-900">
                  <h1 className="text-2xl sm:text-3xl font-bold mb-4">{coin.name}</h1>
                  <p
                    dangerouslySetInnerHTML={sanitizeDescription(
                      showFullDescription ? coin.desc : getShortDescription(coin.desc)
                    )}
                    className="text-gray-400 leading-relaxed"
                  />
                  {coin.desc.length > 300 && (
                    <button
                      className="mt-4 text-blue-500 hover:text-blue-700 font-semibold"
                      onClick={toggleDescription}
                    >
                      {showFullDescription ? "Read Less" : "Read More"}
                    </button>
                  )}
                </div>
              </div>
            </>
          )
        )}
      </header>
    </div>
  );
}

export default CoinPage;
