import React from 'react';
import styles from './OfferModal.module.css';
import Button from './Button';

function OfferModal({ companyName, onConfirm, onCancel }) {
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.emoji}>🤔</div>
        <h2 className={styles.title}>Wait a second...</h2>
        <p className={styles.message}>
          Did you actually receive an offer from <strong>{companyName}</strong>?
        </p>
        <p className={styles.subtitle}>
          Or are you just testing the app?
        </p>
        <div className={styles.actions}>
          <Button onClick={onConfirm}>
            Yes, I got the offer!
          </Button>
          <Button variant="secondary" onClick={onCancel}>
            Just testing
          </Button>
        </div>
      </div>
    </div>
  );
}

export default OfferModal;
