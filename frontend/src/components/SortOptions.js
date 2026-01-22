import React from 'react';
import styles from './SortOptions.module.css';

const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest First' },
  { value: 'oldest', label: 'Oldest First' },
  { value: 'company-asc', label: 'Company A-Z' },
  { value: 'company-desc', label: 'Company Z-A' },
  { value: 'salary-high', label: 'Salary: High to Low' },
  { value: 'salary-low', label: 'Salary: Low to High' },
];

function SortOptions({ sortBy, onSortChange }) {
  return (
    <div className={styles.container}>
      <label className={styles.label}>Sort by:</label>
      <select
        className={styles.select}
        value={sortBy}
        onChange={(e) => onSortChange(e.target.value)}
      >
        {SORT_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SortOptions;
