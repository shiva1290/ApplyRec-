import React from 'react';
import styles from './ApplicationCard.module.css';
import Button from './Button';

function ApplicationCard({ application, onEdit, onDelete }) {
  const statusClass = styles[application.status.toLowerCase()] || styles.default;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  return (
    <div className={`${styles.card} ${application.follow_up ? styles.followUpCard : ''}`}>
      <div className={styles.header}>
        <h3 className={styles.company}>{application.company}</h3>
        <span className={`${styles.status} ${statusClass}`}>{application.status}</span>
      </div>
      <p className={styles.role}>{application.role}</p>
      <p className={styles.date}>Applied: {formatDate(application.applied_date)}</p>
      {application.notes && (
        <div className={styles.notes}>
          <p className={styles.notesText}>{application.notes}</p>
        </div>
      )}
      {application.follow_up ? (
        <div className={styles.followUpBadge}>
          Follow Up Required
        </div>
      ) : null}
      <div className={styles.actions}>
        <Button variant="secondary" onClick={() => onEdit(application)}>
          Edit
        </Button>
        <Button variant="danger" onClick={() => onDelete(application.id)}>
          Delete
        </Button>
      </div>
    </div>
  );
}

export default ApplicationCard;
