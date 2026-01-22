import React from 'react';
import styles from './ApplicationCard.module.css';
import Button from './Button';

function ApplicationCard({ application, onEdit, onDelete }) {
  const statusClass = styles[application.status.toLowerCase()] || styles.default;

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  const getRelativeTime = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = now - date;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
    return formatDate(dateString);
  };

  const formatSalary = (salary) => {
    if (!salary) return null;
    const num = parseFloat(salary);
    const formatted = num % 1 === 0 ? num.toString() : num.toFixed(2).replace(/\.?0+$/, '');
    return `${formatted} LPA`;
  };

  return (
    <div className={`${styles.card} ${application.follow_up ? styles.followUpCard : ''}`}>
      <div className={styles.header}>
        <h3 className={styles.company}>{application.company}</h3>
        <span className={`${styles.status} ${statusClass}`}>{application.status}</span>
      </div>
      
      {application.job_id && (
        <p className={styles.jobId}>ID: {application.job_id}</p>
      )}
      
      <p className={styles.role}>{application.role}</p>
      
      {application.salary && (
        <p className={styles.salary}>{formatSalary(application.salary)}</p>
      )}
      
      <div className={styles.dates}>
        <p className={styles.date} title={formatDate(application.applied_date)}>
          Applied {getRelativeTime(application.applied_date)}
        </p>
        {application.status_updated_at && (
          <p className={styles.dateSmall} title={formatDate(application.status_updated_at)}>
            Status updated {getRelativeTime(application.status_updated_at)}
          </p>
        )}
      </div>
      
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
