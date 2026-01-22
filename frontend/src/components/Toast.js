import React, { useEffect } from 'react';
import styles from './Toast.module.css';

function Toast({ message, type = 'success', onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const getIcon = () => {
    if (type === 'error') return '✕';
    if (message.includes('Offer')) return '🎉';
    if (message.includes('Interview')) return '🌟';
    if (message.includes('Keep') || message.includes('Onward') || message.includes('Stay') || message.includes('Their') || message.includes('pushing')) return '💪';
    return '✓';
  };

  return (
    <div className={`${styles.toast} ${styles[type]} ${message.includes('Offer') ? styles.celebration : ''}`}>
      <span className={styles.icon}>
        {getIcon()}
      </span>
      <span className={styles.message}>{message}</span>
      <button className={styles.close} onClick={onClose}>×</button>
    </div>
  );
}

export default Toast;
