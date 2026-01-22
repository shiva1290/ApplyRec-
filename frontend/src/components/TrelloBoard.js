import React, { useState } from 'react';
import styles from './TrelloBoard.module.css';
import ApplicationCard from './ApplicationCard';
import { updateApplicationStatus } from '../services/applicationService';

const STATUS_COLUMNS = [
  { id: 'Applied', label: 'Applied', color: '#1e40af' },
  { id: 'OA', label: 'OA', color: '#92400e' },
  { id: 'Interview', label: 'Interview', color: '#5b21b6' },
  { id: 'Rejected', label: 'Rejected', color: '#991b1b' },
  { id: 'Offer', label: 'Offer', color: '#065f46' },
];

function TrelloBoard({ applications, onEdit, onDelete, onStatusUpdate, onOfferDrop }) {
  const [draggedCard, setDraggedCard] = useState(null);
  const [targetColumn, setTargetColumn] = useState(null);

  const groupApplicationsByStatus = () => {
    const grouped = {};
    STATUS_COLUMNS.forEach(col => {
      grouped[col.id] = [];
    });
    applications.forEach(app => {
      if (grouped[app.status]) {
        grouped[app.status].push(app);
      }
    });
    return grouped;
  };

  const groupedApps = groupApplicationsByStatus();

  const handleDragStart = (e, application) => {
    setDraggedCard(application);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('applicationId', application.id);
  };

  const handleDragOver = (e, statusId) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setTargetColumn(statusId);
  };

  const handleDragLeave = () => {
    setTargetColumn(null);
  };

  const handleDrop = async (e, targetStatus) => {
    e.preventDefault();
    setTargetColumn(null);

    if (!draggedCard || draggedCard.status === targetStatus) {
      setDraggedCard(null);
      return;
    }

    const previousStatus = draggedCard.status;

    if (targetStatus === 'Offer') {
      if (onOfferDrop) {
        onOfferDrop(draggedCard, previousStatus);
      }
      setDraggedCard(null);
      return;
    }

    try {
      await updateApplicationStatus(draggedCard.id, targetStatus);
      if (onStatusUpdate) {
        onStatusUpdate(previousStatus, targetStatus);
      }
    } catch (error) {
      console.error('Failed to update status:', error);
    }

    setDraggedCard(null);
  };

  return (
    <div className={styles.board}>
      {STATUS_COLUMNS.map((column) => (
        <div
          key={column.id}
          className={`${styles.column} ${targetColumn === column.id ? styles.dragOver : ''}`}
          onDragOver={(e) => handleDragOver(e, column.id)}
          onDragLeave={handleDragLeave}
          onDrop={(e) => handleDrop(e, column.id)}
        >
          <div className={styles.columnHeader} style={{ borderTopColor: column.color }}>
            <h3 className={styles.columnTitle}>{column.label}</h3>
            <span className={styles.columnCount}>{groupedApps[column.id]?.length || 0}</span>
          </div>
          <div className={styles.columnContent}>
            {groupedApps[column.id]?.map((app) => (
              <div
                key={app.id}
                draggable
                onDragStart={(e) => handleDragStart(e, app)}
                className={styles.draggableCard}
              >
                <ApplicationCard
                  application={app}
                  onEdit={onEdit}
                  onDelete={onDelete}
                />
              </div>
            ))}
            {(!groupedApps[column.id] || groupedApps[column.id].length === 0) && (
              <div className={styles.emptyColumn}>
                Drop applications here
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default TrelloBoard;
