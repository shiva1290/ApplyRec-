import React from 'react';
import styles from './Statistics.module.css';

function Statistics({ applications }) {
  const stats = {
    total: applications.length,
    applied: applications.filter(app => app.status === 'Applied').length,
    oa: applications.filter(app => app.status === 'OA').length,
    interview: applications.filter(app => app.status === 'Interview').length,
    rejected: applications.filter(app => app.status === 'Rejected').length,
    offer: applications.filter(app => app.status === 'Offer').length,
    followUp: applications.filter(app => app.follow_up).length
  };

  return (
    <div className={styles.container}>
      <div className={styles.statCard}>
        <div className={styles.statValue}>{stats.total}</div>
        <div className={styles.statLabel}>Total Applications</div>
      </div>
      <div className={`${styles.statCard} ${styles.applied}`}>
        <div className={styles.statValue}>{stats.applied}</div>
        <div className={styles.statLabel}>Applied</div>
      </div>
      <div className={`${styles.statCard} ${styles.oa}`}>
        <div className={styles.statValue}>{stats.oa}</div>
        <div className={styles.statLabel}>OA</div>
      </div>
      <div className={`${styles.statCard} ${styles.interview}`}>
        <div className={styles.statValue}>{stats.interview}</div>
        <div className={styles.statLabel}>Interview</div>
      </div>
      <div className={`${styles.statCard} ${styles.rejected}`}>
        <div className={styles.statValue}>{stats.rejected}</div>
        <div className={styles.statLabel}>Rejected</div>
      </div>
      <div className={`${styles.statCard} ${styles.offer}`}>
        <div className={styles.statValue}>{stats.offer}</div>
        <div className={styles.statLabel}>Offer</div>
      </div>
      {stats.followUp > 0 ? (
        <div className={`${styles.statCard} ${styles.followUp}`}>
          <div className={styles.statValue}>{stats.followUp}</div>
          <div className={styles.statLabel}>Follow Up</div>
        </div>
      ) : null}
    </div>
  );
}

export default Statistics;
