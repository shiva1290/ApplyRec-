import React from 'react';
import styles from './Select.module.css';

function Select({ label, value, onChange, options, error, required = false, ...props }) {
  return (
    <div className={styles.selectGroup}>
      {label && (
        <label className={styles.label}>
          {label}
          {required && <span className={styles.required}>*</span>}
        </label>
      )}
      <select
        className={`${styles.select} ${error ? styles.error : ''}`}
        value={value}
        onChange={onChange}
        required={required}
        {...props}
      >
        <option value="">Select...</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <span className={styles.errorMessage}>{error}</span>}
    </div>
  );
}

export default Select;
