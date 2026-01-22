import React from 'react';
import styles from './SearchBar.module.css';

function SearchBar({ searchQuery, onSearchChange }) {
  return (
    <div className={styles.container}>
      <input
        type="text"
        className={styles.searchInput}
        placeholder="Search by company name..."
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
      />
      {searchQuery && (
        <button
          className={styles.clearButton}
          onClick={() => onSearchChange('')}
          type="button"
        >
          ×
        </button>
      )}
    </div>
  );
}

export default SearchBar;
