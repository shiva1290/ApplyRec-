import React, { useState, useEffect } from 'react';
import styles from './ApplicationForm.module.css';
import Input from './Input';
import Select from './Select';
import Button from './Button';

const STATUS_OPTIONS = [
  { value: 'Applied', label: 'Applied' },
  { value: 'OA', label: 'OA' },
  { value: 'Interview', label: 'Interview' },
  { value: 'Rejected', label: 'Rejected' },
  { value: 'Offer', label: 'Offer' },
];

function ApplicationForm({ application, onSubmit, onCancel, isLoading }) {
  const [formData, setFormData] = useState({
    company: '',
    role: '',
    status: 'Applied',
    appliedDate: '',
    notes: '',
    followUp: false,
  });

  useEffect(() => {
    if (application) {
      const date = new Date(application.applied_date).toISOString().split('T')[0];
      setFormData({
        company: application.company,
        role: application.role,
        status: application.status,
        appliedDate: date,
        notes: application.notes || '',
        followUp: application.follow_up || false,
      });
    }
  }, [application]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2 className={styles.title}>
        {application ? 'Edit Application' : 'Add New Application'}
      </h2>

      <Input
        label="Company Name"
        name="company"
        value={formData.company}
        onChange={handleChange}
        required
      />

      <Input
        label="Role"
        name="role"
        value={formData.role}
        onChange={handleChange}
        required
      />

      <Select
        label="Status"
        name="status"
        value={formData.status}
        onChange={handleChange}
        options={STATUS_OPTIONS}
        required
      />

      <Input
        label="Applied Date"
        name="appliedDate"
        type="date"
        value={formData.appliedDate}
        onChange={handleChange}
        required
      />

      <div className={styles.inputGroup}>
        <label className={styles.label}>
          Notes
        </label>
        <textarea
          name="notes"
          className={styles.textarea}
          value={formData.notes}
          onChange={handleChange}
          rows="4"
          placeholder="Add any additional notes..."
        />
      </div>

      <div className={styles.checkboxGroup}>
        <input
          type="checkbox"
          name="followUp"
          id="followUp"
          checked={formData.followUp}
          onChange={handleChange}
          className={styles.checkbox}
        />
        <label htmlFor="followUp" className={styles.checkboxLabel}>
          Mark for follow-up
        </label>
      </div>

      <div className={styles.actions}>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Saving...' : application ? 'Update' : 'Create'}
        </Button>
        {onCancel && (
          <Button type="button" variant="secondary" onClick={onCancel}>
            Cancel
          </Button>
        )}
      </div>
    </form>
  );
}

export default ApplicationForm;
