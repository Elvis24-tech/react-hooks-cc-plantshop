import React from 'react';

function SearchBar({ searchTerm, setSearchTerm }) {
  return (
    <div className="searchbar">
      <input
        type="text"
        className="search-bar"
        placeholder="Search plants by name..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
}

export default SearchBar;