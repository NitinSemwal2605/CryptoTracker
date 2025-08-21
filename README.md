# 🚀 Crypto Tracker - Real-Time Cryptocurrency Tracking Application

A modern, responsive cryptocurrency tracking application built with React.js that provides real-time data, interactive charts, and comprehensive crypto analytics.

## 📋 Table of Contents
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Installation & Setup](#-installation--setup)
- [Usage](#-usage)
- [API Integration](#-api-integration)
- [Key Components](#-key-components)
- [Interview Questions](#-interview-questions)
- [Contributing](#-contributing)
- [License](#-license)

## ✨ Features

### 🎯 Core Features
- **Real-time Cryptocurrency Data**: Live price updates from CoinGecko API
- **Interactive Charts**: Line charts with multiple timeframes (1D, 7D, 30D, 1Y)
- **Comprehensive Dashboard**: Market cap, volume, price changes, and more
- **Search & Filter**: Advanced search functionality with pagination
- **Coin Comparison**: Compare multiple cryptocurrencies side-by-side
- **Watchlist**: Personal portfolio tracking with Firebase integration
- **Dark/Light Theme**: Toggle between themes with persistent storage
- **Responsive Design**: Mobile-first approach with Tailwind CSS

### 🎨 UI/UX Features
- **Animated Cursor**: Custom animated cursor for desktop users
- **Smooth Animations**: Framer Motion powered transitions
- **Toast Notifications**: User feedback with react-toastify
- **Loading States**: Skeleton loaders and progress indicators
- **Material-UI Components**: Modern, accessible UI components

### 🔐 Authentication & Data
- **Firebase Authentication**: Secure user login/signup
- **User Profiles**: Personalized experience with user data
- **Data Persistence**: Local storage for theme preferences
- **Real-time Updates**: Live data synchronization

## 🛠 Tech Stack

### Frontend
- **React 18.3.1** - Modern React with hooks and functional components
- **React Router DOM 6.26.2** - Client-side routing
- **Material-UI 6.0.2** - Component library
- **Tailwind CSS 3.4.10** - Utility-first CSS framework
- **Framer Motion 11.5.4** - Animation library
- **Chart.js 3.9.1** - Interactive charts
- **React Chart.js 2 4.3.1** - React wrapper for Chart.js

### Backend & APIs
- **Firebase 10.13.1** - Authentication and database
- **CoinGecko API** - Cryptocurrency data
- **Axios 1.7.7** - HTTP client

### Development Tools
- **React Scripts 5.0.1** - Create React App scripts
- **PostCSS 8.4.45** - CSS processing
- **Autoprefixer 10.4.20** - CSS vendor prefixes

## 📁 Project Structure

```
cryptotracker/
├── public/                          # Static assets
│   ├── favicon.ico
│   ├── index.html
│   ├── manifest.json
│   └── robots.txt
├── src/
│   ├── components/                  # Reusable UI components
│   │   ├── About/                   # About section component
│   │   ├── Banner/                  # Hero banner component
│   │   ├── Coin/                    # Coin-specific components
│   │   │   ├── CoinInfo/           # Coin information display
│   │   │   ├── LineChart/          # Interactive price charts
│   │   │   ├── PriceType/          # Price type selector
│   │   │   └── SelectDays/         # Time period selector
│   │   ├── Common/                  # Shared components
│   │   │   ├── Button/             # Reusable button component
│   │   │   ├── Footer/             # Site footer
│   │   │   ├── Header/             # Navigation header
│   │   │   └── Loader/             # Loading spinner
│   │   ├── Compare/                # Coin comparison components
│   │   │   └── SelectCoin/         # Coin selection for comparison
│   │   ├── Dashboard/              # Dashboard components
│   │   │   ├── Grid/               # Grid layout for coins
│   │   │   ├── List/               # List layout for coins
│   │   │   ├── Pagination/         # Pagination controls
│   │   │   ├── Search/             # Search functionality
│   │   │   └── Tabs/               # Tab navigation
│   │   ├── LandingPage/            # Homepage components
│   │   │   └── MainComponent/      # Main landing content
│   │   ├── Testimonials/           # Testimonials section
│   │   └── Watchlist/              # Watchlist components
│   ├── contexts/                   # React Context providers
│   │   └── authContext/            # Authentication context
│   ├── functions/                  # Utility functions
│   │   ├── coinObject.js          # Coin data formatting
│   │   ├── getCoinData.js         # API data fetching
│   │   └── getCoinPrices.js       # Price data retrieval
│   ├── pages/                      # Page components
│   │   ├── AuthContext.js         # Authentication wrapper
│   │   ├── Coin.js                # Individual coin page
│   │   ├── ComparePage.js         # Comparison page
│   │   ├── DashboardPage.js       # Main dashboard
│   │   ├── LoginPage.js           # Login page
│   │   ├── SignupPage.js          # Signup page
│   │   └── WatchlistPage.js       # Watchlist page
│   ├── App.js                     # Main application component
│   ├── App.css                    # Application styles
│   ├── index.js                   # Application entry point
│   └── index.css                  # Global styles
├── package.json                   # Dependencies and scripts
├── tailwind.config.js            # Tailwind CSS configuration
├── postcss.config.js             # PostCSS configuration
└── README.md                     # Project documentation
```

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn package manager
- Firebase account (for authentication)

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd cryptotracker
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Firebase Configuration**
   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
   - Enable Authentication (Email/Password)
   - Get your Firebase config and add it to your project
   - Create a `firebase.js` file in the `src` directory:

   ```javascript
   import { initializeApp } from 'firebase/app';
   import { getAuth } from 'firebase/auth';
   import { getFirestore } from 'firebase/firestore';

   const firebaseConfig = {
     apiKey: "your-api-key",
     authDomain: "your-auth-domain",
     projectId: "your-project-id",
     storageBucket: "your-storage-bucket",
     messagingSenderId: "your-messaging-sender-id",
     appId: "your-app-id"
   };

   const app = initializeApp(firebaseConfig);
   export const auth = getAuth(app);
   export const db = getFirestore(app);
   ```

4. **Start the development server**
   ```bash
   npm start
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

## 📱 Usage

### Dashboard
- View real-time cryptocurrency data
- Search and filter coins by name or symbol
- Toggle between grid and list views
- Navigate through paginated results

### Individual Coin Page
- Detailed coin information and statistics
- Interactive price charts with multiple timeframes
- Price type selection (prices, market cap, volume)
- Historical data visualization

### Comparison Tool
- Compare multiple cryptocurrencies side-by-side
- Analyze performance differences
- Visual comparison charts

### Watchlist
- Add/remove coins to personal watchlist
- Track favorite cryptocurrencies
- Personalized portfolio view

## 🔌 API Integration

### CoinGecko API
The application uses the CoinGecko API for real-time cryptocurrency data:

- **Base URL**: `https://api.coingecko.com/api/v3`
- **Endpoints Used**:
  - `/coins/markets` - Market data for multiple coins
  - `/coins/{id}` - Detailed coin information
  - `/coins/{id}/market_chart` - Historical price data

### Rate Limiting
- CoinGecko API has rate limits (10-50 calls/minute for free tier)
- Implemented error handling for rate limit exceeded
- Consider upgrading to paid tier for production use

## 🧩 Key Components

### 1. DashboardPage.js
- Main dashboard with coin listing
- Search functionality with debouncing
- Pagination implementation
- Loading states and error handling

### 2. Coin.js
- Individual coin detail page
- Chart.js integration for price visualization
- Multiple timeframe selection
- Price type toggles (price, market cap, volume)

### 3. AuthContext
- Firebase authentication wrapper
- User state management
- Protected route implementation

### 4. LineChart Component
- Chart.js configuration
- Responsive chart rendering
- Custom styling and animations

## 💡 Interview Questions

### React & JavaScript

1. **State Management**
   - Q: How do you manage state in this application?
   - A: Uses React hooks (useState, useEffect) and Context API for global state. Firebase handles authentication state.

2. **Component Architecture**
   - Q: Explain the component structure and why it's organized this way?
   - A: Modular component architecture with reusable components in `/components`, page-level components in `/pages`, and utility functions in `/functions`.

3. **Performance Optimization**
   - Q: What performance optimizations have you implemented?
   - A: React.memo for expensive components, debounced search, pagination, lazy loading, and proper dependency arrays in useEffect.

4. **Custom Hooks**
   - Q: Would you create custom hooks for this project? What would they be?
   - A: `useCoinData()`, `useChartData()`, `useSearch()`, `usePagination()` for reusable logic.

### API & Data Handling

5. **API Integration**
   - Q: How do you handle API errors and loading states?
   - A: Try-catch blocks, loading state management, error boundaries, and user-friendly error messages.

6. **Data Fetching**
   - Q: Explain the data fetching strategy used in the application?
   - A: Axios for HTTP requests, useEffect for data fetching, proper cleanup, and error handling.

7. **Real-time Updates**
   - Q: How would you implement real-time price updates?
   - A: WebSocket connections, polling with setInterval, or server-sent events for live data.

### UI/UX & Styling

8. **Responsive Design**
   - Q: How is responsive design implemented?
   - A: Tailwind CSS utility classes, mobile-first approach, breakpoint-based styling, and responsive charts.

9. **Theme Implementation**
   - Q: How is the dark/light theme implemented?
   - A: CSS custom properties, localStorage persistence, context-based theme switching, and dynamic class application.

10. **Animation & Interactions**
    - Q: What animation libraries are used and why?
    - A: Framer Motion for page transitions, react-animated-cursor for custom cursor, and Chart.js animations.

### Advanced Concepts

11. **Code Splitting**
    - Q: How would you implement code splitting in this application?
    - A: React.lazy() for route-based splitting, dynamic imports for heavy components, and webpack optimization.

12. **Testing Strategy**
    - Q: What testing approach would you use for this application?
    - A: Jest for unit tests, React Testing Library for component tests, Cypress for E2E tests, and API mocking.

13. **Security Considerations**
    - Q: What security measures are implemented?
    - A: Firebase authentication, input sanitization with DOMPurify, HTTPS enforcement, and API key protection.

14. **Scalability**
    - Q: How would you scale this application for millions of users?
    - A: CDN for static assets, caching strategies, database optimization, microservices architecture, and load balancing.

### Technical Deep Dives

15. **Chart.js Implementation**
    - Q: Explain the Chart.js configuration and customization?
    - A: Custom datasets, responsive options, animation configurations, and theme integration.

16. **Firebase Integration**
    - Q: How is Firebase used in the application?
    - A: Authentication, Firestore for user data, real-time listeners, and security rules.

17. **State Persistence**
    - Q: How do you persist user preferences and data?
    - A: localStorage for theme preferences, Firebase for user data, and session management.

18. **Error Boundaries**
    - Q: How would you implement error boundaries?
    - A: React Error Boundary components, fallback UI, error logging, and graceful degradation.

### System Design

19. **Architecture Decisions**
    - Q: Why did you choose this tech stack?
    - A: React for component reusability, Material-UI for rapid development, Tailwind for utility-first styling, and Firebase for backend-as-a-service.

20. **Future Enhancements**
    - Q: What features would you add next?
    - A: Portfolio tracking, price alerts, social features, advanced analytics, mobile app, and cryptocurrency news integration.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [CoinGecko](https://www.coingecko.com/) for providing the cryptocurrency API
- [Material-UI](https://mui.com/) for the component library
- [Chart.js](https://www.chartjs.org/) for chart functionality
- [Firebase](https://firebase.google.com/) for authentication and database services

---

**Built with ❤️ using React.js and modern web technologies**
