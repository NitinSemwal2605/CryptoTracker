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
├── assets/
│   ├── components/
│   │   ├── About/
│   │   │   └── index.jsx
│   │   ├── Banner/
│   │   │   └── index.jsx
│   │   ├── Coin/
│   │   │   ├── CoinInfo/
│   │   │   │   ├── index.jsx
│   │   │   │   └── styles.css
│   │   │   ├── LineChart/
│   │   │   │   ├── index.jsx
│   │   │   │   └── styles.css
│   │   │   ├── SelectDays/
│   │   │   │   ├── index.jsx
│   │   │   │   └── styles.css
│   │   │   └── PriceType/
│   │   │       ├── index.jsx
│   │   │       └── styles.css
│   │   ├── Common/
│   │   │   ├── Button/
│   │   │   │   ├── index.jsx
│   │   │   │   └── styles.css
│   │   │   ├── Footer/
│   │   │   │   ├── index.jsx
│   │   │   │   └── styles.css
│   │   │   ├── Header/
│   │   │   │   ├── drawer.js
│   │   │   │   ├── index.jsx
│   │   │   │   └── styles.css
│   │   │   ├── Loader/
│   │   │   │   ├── index.jsx
│   │   │   │   └── styles.css
│   │   │   ├── Search/
│   │   │   │   ├── index.jsx
│   │   │   │   └── styles.css
│   │   │   ├── Tabs/
│   │   │   │   ├── index.jsx
│   │   │   │   └── styles.css
│   │   │   └── Pagination/
│   │   │       ├── index.jsx
│   │   │       └── styles.css
│   │   ├── Dashboard/
│   │   │   ├── Grid/
│   │   │   │   ├── index.jsx
│   │   │   │   └── styles.css
│   │   │   ├── List/
│   │   │   │   ├── index.jsx
│   │   │   │   └── styles.css
│   │   │   └── Testimonials/
│   │   │       └── index.jsx
│   │   └── Watchlist/
│   │       └── index.jsx
│   └── styles.css
│
├── functions/
│   ├── coinObject.js
│   ├── getCoinData.js
│   └── getCoinPrices.js
│
├── pages/
│   ├── AuthContext.js
│   ├── Coin.js
│   ├── ComparePage.js
│   ├── DashboardPage.js
│   ├── LoginPage.js
│   ├── SignupPage.js
│   └── WatchlistPage.js
│
├── App.css
├── App.js
├── index.css
├── index.js
├── .gitignore
├── database.rules.json
├── package-lock.json
├── package.json
├── postcss.config.js
├── README.md
└── tailwind.config.js
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

---

## Watchlist Functionality

- The watchlist is maintained using the browser’s `localStorage`.
- Upon adding or removing a coin, a toast notification appears to inform the user of the action.

### Example Code Snippet

```js
const handleWatchlistToggle = (coin) => {
  // Logic to add/remove from watchlist
  toast.success(`${coin.name} added to watchlist!`);
};
```

---

## Toast Notifications

**Toastify** is used to provide user feedback when coins are added or removed from the watchlist.

### Example Notification

```js
toast.success("Coin added to watchlist!");
```

---

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request with your changes.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---
