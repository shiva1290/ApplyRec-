import React from 'react';
import styles from './Input.module.css';

function Input({ label, type = 'text', value, onChange, error, required = false, ...props }) {
  return (
    <div className={styles.inputGroup}>
      {label && (
        <label className={styles.label}>
          {label}
          {required && <span className={styles.required}>*</span>}
        </label>
      )}
      <input
        type={type}
        className={`${styles.input} ${error ? styles.error : ''}`}
        value={value}
        onChange={onChange}
        required={required}
        {...props}
      />
      {error && <span className={styles.errorMessage}>{error}</span>}
    </div>
  );
}

export default Input;
