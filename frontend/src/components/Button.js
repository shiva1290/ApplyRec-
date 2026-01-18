import React from 'react';
import styles from './Button.module.css';

function Button({ children, onClick, variant = 'primary', type = 'button', disabled = false }) {
  const buttonClass = `${styles.button} ${styles[variant]}`;
  
  return (
    <button
      type={type}
      className={buttonClass}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default Button;
