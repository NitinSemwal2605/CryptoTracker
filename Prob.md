## Interview Questions and Answers — Crypto Tracker

### React Fundamentals (1–8)
1) Q: What problem does this Crypto Tracker solve?
A: It displays real-time cryptocurrency market data with search, pagination, charts, comparisons, and a personal watchlist with Firebase-authenticated users.

2) Q: Which React features are primarily used?
A: Functional components, hooks (`useState`, `useEffect`), Context API for auth, and React Router v6 for navigation.

3) Q: How are routes organized?
A: `App.js` defines routes for `/` (home), `/dashboard`, `/coin/:coinID`, `/compare`, and `/watchlist` using `Routes` and `Route` from React Router v6.

4) Q: How is global UI state like theme handled?
A: `App.js` keeps `darkMode` in state, persists it to `localStorage`, and sets a `data-theme` attribute on `documentElement`.

5) Q: Why use functional components over class components here?
A: Hooks provide simpler state/effect management, better composition, and smaller bundle sizes compared to class lifecycle methods.

6) Q: What third-party UI libraries are used?
A: Material UI (MUI) for components, Tailwind CSS for utilities, `react-toastify` for toasts, and `framer-motion` for animations.

7) Q: How are notifications implemented?
A: Using `react-toastify` with a global `ToastContainer` in `App.js`; actions like theme change call `toast.success(...)`.

8) Q: How do you conditionally render the animated cursor?
A: Track `isMobile` via `window.innerWidth < 768` and `resize` listener; only render `AnimatedCursor` when `!isMobile`.

### State and Effects (9–14)
9) Q: Where is data fetching triggered and why?
A: In `useEffect` hooks (e.g., `DashboardPage`, `Coin.js`) to fetch on mount or when dependencies like `coinID`, `days`, `priceType` change.

10) Q: How is loading state handled?
A: Boolean `loading`/`isLoading` flags show a `Loader` component until data is available or an error occurs.

11) Q: How do you prevent unnecessary re-fetches?
A: Proper dependency arrays, separating concerns (coin meta vs. chart data), and conditional effects based on required params.

12) Q: How is pagination state managed?
A: `currentPage`, `coinsPerPage`, and derived `paginatedCoins`; on search/page change we recompute the slice.

13) Q: How is search implemented?
A: A controlled input updates `search`; coins are filtered by `name` or `symbol` before pagination. (Debounce can be added for optimization.)

14) Q: How is potentially unsafe HTML handled in coin descriptions?
A: `DOMPurify` sanitizes the HTML description from CoinGecko before rendering.

### React Router (15–18)
15) Q: How do you access route parameters like `coinID`?
A: With `useParams()` from `react-router-dom` in `Coin.js`.

16) Q: How are routes declared in v6?
A: Using `<Routes>` with individual `<Route path="..." element={<Component/>} />` entries.

17) Q: How would you implement protected routes for Watchlist?
A: Wrap watchlist route with an auth guard that reads `currentUser` from context and redirects unauthenticated users to login.

18) Q: How do you do programmatic navigation in v6?
A: Use `useNavigate()` hook and call `navigate('/path')`.

### Data Fetching & API (19–24)
19) Q: Which API powers market data?
A: CoinGecko REST API (`/coins/markets`, `/coins/{id}`, `/coins/{id}/market_chart`).

20) Q: How are HTTP requests made?
A: With `axios`. Example: `axios.get('https://api.coingecko.com/api/v3/coins/markets?...')` in `DashboardPage`.

21) Q: How do you handle API errors?
A: `try/catch` or `.catch(...)`, set error state (e.g., `setError(true)`), log error, and show fallback UI/toast.

22) Q: How do you avoid rate-limit issues?
A: Minimize requests, reuse results, cache where possible, debounce interactions, and consolidate dependent requests.

23) Q: How is coin detail data shaped?
A: `Coin.js` maps API response to a simplified object with `id`, `name`, `symbol`, `image`, `desc`, `current_price`, `market_cap`, etc.

24) Q: How is chart series selected?
A: By `priceType` state (`prices`, `market_cap`, `total_volume`) and `days`; switch determines which series to extract.

### Charts & Visualization (25–28)
25) Q: Which charting libs are used?
A: `chart.js` with `react-chartjs-2`. `chartjs-adapter-date-fns` provides time axis formatting.

26) Q: How are chart datasets formed?
A: Transform `[timestamp, value]` arrays into labels and data arrays; configure dataset styling (color, tension, fill).

27) Q: How do you make charts responsive?
A: Set responsive options in Chart.js, use container CSS, and recompute on `days`/`priceType` changes.

28) Q: How do you ensure safe rendering performance for charts?
A: Limit dataset size via `days` selection, memoize processed data, and avoid re-creating chart options per render.

### Performance Optimization (29–33)
29) Q: How is client performance maintained on the dashboard?
A: Pagination to limit items per view, search filtering before slice, and conditional rendering of heavy components.

30) Q: What would you memoize?
A: Computed filtered lists, chart options/datasets, and expensive child components with `React.memo`.

31) Q: How to prevent layout thrashing?
A: Use CSS for animations (Framer Motion), avoid heavy synchronous work in render, batch state updates.

32) Q: How to optimize API usage for chart changes?
A: Cache results by (`coinID`, `days`) and switch series client-side if API returns multiple series; debounce slider/toggle changes.

33) Q: How do you handle large lists efficiently?
A: Pagination (current approach). For thousands of rows, use virtualization libraries like `react-window`.

### Styling & Theming (34–37)
34) Q: How is dark mode implemented?
A: Persisted boolean in `localStorage`, toggled in `App.js`, and applied via `data-theme` + CSS variables/Tailwind classes.

35) Q: Why mix MUI and Tailwind?
A: MUI gives accessible, ready components; Tailwind offers rapid utility styling and fine-grained control.

36) Q: How do you keep styles consistent across components?
A: Define shared tokens (colors, spacing), apply Tailwind config, and theme MUI components for consistency.

37) Q: How do you handle global vs. local CSS?
A: Global styles in `index.css/App.css`; component-specific styles colocated; prefer Tailwind utilities for most cases.

### Authentication & Firebase (38–42)
38) Q: What does the Auth Context provide?
A: `currentUser`, `userLoggedIn`, and `loading` to control rendering and protect routes.

39) Q: How is auth state observed?
A: With Firebase `onAuthStateChanged(auth, cb)`; updates context state, then renders children when `loading` is false.

40) Q: What improvements would you make to `authContext/index.js`?
A: Import `React` for `createContext`, use the imported `onAuthStateChanged` function consistently, fix `initializeUser` (references undefined `user`), and expose auth actions (login, logout).

41) Q: How would you implement a watchlist per user?
A: Store watchlist in Firestore under `users/{uid}/watchlist` or a user doc field; sync via real-time listeners.

42) Q: How do you secure user data in Firebase?
A: Firestore security rules restricting access to authenticated users and their own docs; validate inputs; avoid exposing secrets.

### Testing & Quality (43–46)
43) Q: What tests would you write?
A: Unit tests for utils (formatting), component tests for `DashboardPage` and `Coin.js`, and integration tests for routing and auth guards.

44) Q: How to test data fetching components?
A: Mock axios responses, assert loading states, rendered data, and error fallback behaviors.

45) Q: How to test charts?
A: Assert presence of canvas and dataset props; mock Chart.js; verify labels/datasets derived from inputs.

46) Q: How do you lint/type-check?
A: CRA ESLint config is included; optionally add TypeScript for static typing and better DX.

### Deployment & Security (47–50)
47) Q: How would you deploy this app?
A: Build with `npm run build` and deploy the `build/` folder to services like Vercel, Netlify, or Firebase Hosting.

48) Q: How do you handle environment variables?
A: Use `.env` files with `REACT_APP_` prefix; never commit secrets; configure CI/CD to inject env vars.

49) Q: How do you mitigate XSS from API content?
A: Sanitize HTML with `DOMPurify`, disable `dangerouslySetInnerHTML` where unnecessary, and use Content Security Policy.

50) Q: What are key production hardening steps?
A: Enable HTTPS, set strict CSP, audit dependencies, implement error logging/monitoring, and tune API usage/caching.
