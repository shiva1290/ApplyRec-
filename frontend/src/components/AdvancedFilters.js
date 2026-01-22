import React from 'react';
import styles from './AdvancedFilters.module.css';

function AdvancedFilters({ 
  roles, 
  selectedRole, 
  onRoleChange, 
  minSalary, 
  maxSalary, 
  onMinSalaryChange, 
  onMaxSalaryChange,
  onClear
}) {
  const hasFilters = selectedRole || minSalary || maxSalary;

  return (
    <div className={styles.container}>
      <div className={styles.filterGroup}>
        <label className={styles.label}>Role</label>
        <select
          className={styles.select}
          value={selectedRole}
          onChange={(e) => onRoleChange(e.target.value)}
        >
          <option value="">All Roles</option>
          {roles.map((role) => (
            <option key={role} value={role}>{role}</option>
          ))}
        </select>
      </div>

      <div className={styles.filterGroup}>
        <label className={styles.label}>Salary Range (LPA)</label>
        <div className={styles.salaryInputs}>
          <input
            type="number"
            step="0.1"
            className={styles.input}
            placeholder="Min"
            value={minSalary}
            onChange={(e) => onMinSalaryChange(e.target.value)}
          />
          <span className={styles.separator}>-</span>
          <input
            type="number"
            step="0.1"
            className={styles.input}
            placeholder="Max"
            value={maxSalary}
            onChange={(e) => onMaxSalaryChange(e.target.value)}
          />
        </div>
      </div>

      {hasFilters && (
        <button className={styles.clearButton} onClick={onClear}>
          Clear Filters
        </button>
      )}
    </div>
  );
}

export default AdvancedFilters;
