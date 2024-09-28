Here's an in-depth **README.md** file for your cryptocurrency tracker project with watchlist functionality:

---

# CryptoTracker

CryptoTracker is a cryptocurrency tracking application that fetches live data from the [CoinGecko API](https://www.coingecko.com/en/api) and displays key information such as the coin’s price, volume, and market cap. Users can add coins to a personalized **watchlist**, which is stored in the browser’s `localStorage`. The watchlist feature allows users to toggle their favorite coins and keeps them saved until manually removed.

## Table of Contents
1. [Features](#features)
2. [Technologies Used](#technologies-used)
3. [Project Structure](#project-structure)
4. [Installation](#installation)
5. [Usage](#usage)
6. [Components](#components)
    - [Grid](#grid-component)
    - [List](#list-component)
    - [Watchlist](#watchlist-page)
7. [API Integration](#api-integration)
8. [Watchlist Functionality](#watchlist-functionality)
9. [Toast Notifications](#toast-notifications)
10. [Contributing](#contributing)
11. [License](#license)

---

## Features

- **Real-time cryptocurrency data**: Fetches current prices, volume, market cap, and price changes from the CoinGecko API.
- **Watchlist**: Add/remove favorite cryptocurrencies to a watchlist, which persists in `localStorage`.
- **Interactive UI**: Includes graphical components that display coin details, with positive/negative changes clearly highlighted.
- **Navigation**: Users can click on a coin to navigate to a detailed view of that particular coin.
- **Responsive Design**: Tailored for both desktop and mobile devices using **Tailwind CSS**.

---

## Technologies Used

- **React.js**: Core framework for building the UI.
- **React Router**: For navigating between different pages in the app.
- **Axios**: To fetch data from external APIs.
- **Material UI Icons**: For icons like stars, trending indicators.
- **Tailwind CSS**: For styling and responsive design.
- **Toastify**: For displaying notifications when adding/removing coins to/from the watchlist.
- **localStorage**: For persisting user preferences (watchlist).

---

## Project Structure

```bash
├── src
│   ├── components
│   │   ├── Grid.js          # Displays individual coin information
│   │   ├── List.js          # Displays the full list of coins
│   ├── pages
│   │   ├── WatchlistPage.js # Displays the user's watchlist
│   ├── App.js               # Main entry point for routing
│   ├── index.js             # React DOM render entry point
│   ├── styles.css           # Custom CSS styling
├── public
│   ├── index.html
├── package.json             # Dependencies and scripts
└── README.md                # Project documentation
```

---

## Installation

### Prerequisites

Ensure you have **Node.js** and **npm** installed.

### Steps

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/cryptotracker.git
   cd cryptotracker
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Start the development server:**

   ```bash
   npm start
   ```

4. **Access the application**:

   The app will be accessible at `http://localhost:3000`.

---

## Usage

1. **Viewing Coins**: On the homepage, you will see a list of popular cryptocurrencies with their key stats like price, 24-hour percentage change, total volume, and market cap.
2. **Watchlist Feature**: Click on the star next to any coin to add or remove it from the watchlist. Your selection will be stored in `localStorage` and persist across sessions.
3. **Watchlist Page**: Navigate to the watchlist page via the header to view all your favorited coins.

---

## Components

### **Grid Component**

This component displays individual coin data in a grid format, which is clickable and navigates to the detailed page of the coin. It also includes a star icon for adding/removing coins to/from the watchlist.

#### Props
- `coin`: Object containing the coin's details such as price, volume, and market cap.

#### Example

```jsx
<Grid coin={coin} />
```

### **List Component**

The `List` component renders a table of all the cryptocurrencies fetched from the API, displaying price, percentage change, and the star icon for adding/removing from the watchlist.

#### Props
- `coins`: Array of coin objects that need to be displayed.

#### Example

```jsx
<List coins={coins} />
```

### **Watchlist Page**

This component displays all the coins that have been added to the watchlist. It fetches the saved list from `localStorage` on page load.

---

## API Integration

The app integrates with the CoinGecko API to fetch real-time data on cryptocurrencies. API requests are made using Axios for efficient HTTP requests.

### Example API Request

```js
const fetchCoinsData = async () => {
  try {
    const response = await axios.get(
      `https://api.coingecko.com/api/v3/coins/markets`,
      { params: { vs_currency: 'usd', ids: coinIds.join(',') } }
    );
    setWatchlistCoins(response.data);
  } catch (error) {
    console.error("Error fetching coins", error);
  }
};
```

### API Reference

- **Base URL**: `https://api.coingecko.com/api/v3/`
- **Endpoints Used**:
  - `/coins/markets` for fetching market data for a list of coins.

---

## Watchlist Functionality

### Adding a Coin to Watchlist

The watchlist functionality is implemented using `localStorage`. When a user clicks the star icon, the `coin.id` is saved to a `Set` in `localStorage`. The coin remains on the watchlist until manually removed.

### LocalStorage Integration

```js
const [watchlist, setWatchlist] = useState(new Set());

useEffect(() => {
  const savedWatchlist = localStorage.getItem('watchlist');
  if (savedWatchlist) {
    setWatchlist(new Set(JSON.parse(savedWatchlist)));
  }
}, []);

useEffect(() => {
  localStorage.setItem('watchlist', JSON.stringify([...watchlist]));
}, [watchlist]);
```

---

## Toast Notifications

To enhance the user experience, **react-toastify** is used for toast notifications when adding/removing coins from the watchlist.

### Toast Example

```js
toast.success('Added to watchlist');
toast.info('Removed from watchlist');
```

### Toast Configuration

```jsx
<ToastContainer
  position="bottom-right"
  autoClose={3000}
  hideProgressBar={false}
  closeOnClick
  pauseOnHover
/>
```

---

## Contributing

Contributions are welcome! If you have suggestions or find bugs, feel free to create a pull request or open an issue.

1. Fork the repository.
2. Create a new branch: `git checkout -b feature/my-feature`.
3. Make your changes and commit: `git commit -m 'Add new feature'`.
4. Push to the branch: `git push origin feature/my-feature`.
5. Open a pull request on GitHub.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

---

**Happy Coding! 🚀**
