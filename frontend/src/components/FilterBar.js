import React from 'react';
import styles from './FilterBar.module.css';

const STATUS_OPTIONS = [
  { value: null, label: 'All' },
  { value: 'Applied', label: 'Applied' },
  { value: 'OA', label: 'OA' },
  { value: 'Interview', label: 'Interview' },
  { value: 'Rejected', label: 'Rejected' },
  { value: 'Offer', label: 'Offer' },
];

function FilterBar({ selectedStatus, onFilterChange }) {
  return (
    <div className={styles.filterBar}>
      {STATUS_OPTIONS.map((option) => (
        <button
          key={option.value || 'all'}
          className={`${styles.filterButton} ${
            selectedStatus === option.value ? styles.active : ''
          }`}
          onClick={() => onFilterChange(option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}

export default FilterBar;
