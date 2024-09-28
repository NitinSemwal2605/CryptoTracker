import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Loader from '../components/Common/Loader';
import PaginationControlled from '../components/Dashboard/Pagination';
import Search from '../components/Dashboard/Search';
import TabsComponent from '../components/Dashboard/Tabs';

function DashboardPage() {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true); // Start with loading true
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [paginatedCoins, setPaginatedCoins] = useState([]);
  const coinsPerPage = 10; // Number of coins per page

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (coins.length > 0) {
      updatePaginatedCoins();
    }
  }, [search, currentPage, coins]);

  const getData = () => {
    axios
      .get(
        'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false'
      )
      .then((response) => {
        setCoins(response.data);
        setLoading(false); // Set loading to false when data is fetched
      })
      .catch((error) => {
        console.log('ERROR>>>', error.message);
        setLoading(false); // Set loading to false in case of error as well
      });
  };

  const updatePaginatedCoins = () => {
    const filteredCoins = coins.filter(coin =>
      coin.name.toLowerCase().includes(search.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(search.toLowerCase())
    );

    const indexOfLastCoin = currentPage * coinsPerPage;
    const indexOfFirstCoin = indexOfLastCoin - coinsPerPage;
    const currentCoins = filteredCoins.slice(indexOfFirstCoin, indexOfLastCoin);

    setPaginatedCoins(currentCoins);
  };

  const handleSearchChange = (query) => {
    setSearch(query);
    setCurrentPage(1); // Reset page number to 1 when search changes
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  // Calculate total pages based on filtered coins
  const filteredCoins = coins.filter(coin =>
    coin.name.toLowerCase().includes(search.toLowerCase()) ||
    coin.symbol.toLowerCase().includes(search.toLowerCase())
  );
  const totalPages = Math.ceil(filteredCoins.length / coinsPerPage);

  return (
    <div>
      {loading ? (
        <Loader /> // Show loader when data is being fetched
      ) : (
        <>
          <Search search={search} handleSearchChange={handleSearchChange} />
          <TabsComponent coins={paginatedCoins} />
          <PaginationControlled 
            page={currentPage}
            count={totalPages}
            handlePageChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
}

export default DashboardPage;
