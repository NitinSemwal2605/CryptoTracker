// Search/index.js
import SearchIcon from "@mui/icons-material/Search";
import React from "react";
import "./styles.css";

function Search({ search, handleSearchChange }) {
  return (
    <div className="search-flex">
      <SearchIcon sx={{ color: "var(--grey)", fontSize: "1.2rem" }} />
      <input
        className="search-input"
        placeholder="Search"
        value={search}
        onChange={(e) => handleSearchChange(e.target.value)} // Ensure value is passed
      />
    </div>
  );
}

export default Search;
