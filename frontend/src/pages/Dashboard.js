import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Dashboard.module.css';
import Button from '../components/Button';
import ApplicationCard from '../components/ApplicationCard';
import ApplicationForm from '../components/ApplicationForm';
import FilterBar from '../components/FilterBar';
import Statistics from '../components/Statistics';
import SearchBar from '../components/SearchBar';
import SortOptions from '../components/SortOptions';
import TrelloBoard from '../components/TrelloBoard';
import AdvancedFilters from '../components/AdvancedFilters';
import {
  getApplications,
  createApplication,
  updateApplication,
  deleteApplication,
  getRoles,
} from '../services/applicationService';
import { logout } from '../services/authService';
import { getAuthToken } from '../services/api';

function Dashboard() {
  const navigate = useNavigate();
  const [applications, setApplications] = useState([]);
  const [existingRoles, setExistingRoles] = useState([]);
  const [statusFilter, setStatusFilter] = useState(null);
  const [roleFilter, setRoleFilter] = useState('');
  const [minSalary, setMinSalary] = useState('');
  const [maxSalary, setMaxSalary] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [viewMode, setViewMode] = useState('grid');
  const [showForm, setShowForm] = useState(false);
  const [editingApplication, setEditingApplication] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!getAuthToken()) {
      navigate('/login');
      return;
    }
    loadApplications();
    loadRoles();
  }, [navigate]);

  useEffect(() => {
    loadApplications();
  }, [statusFilter, roleFilter, minSalary, maxSalary]);

  const loadApplications = async () => {
    try {
      setIsLoading(true);
      const filters = {};
      if (statusFilter) filters.status = statusFilter;
      if (roleFilter) filters.role = roleFilter;
      if (minSalary) filters.minSalary = minSalary;
      if (maxSalary) filters.maxSalary = maxSalary;
      
      const data = await getApplications(filters);
      setApplications(data);
    } catch (err) {
      setError(err.message || 'Failed to load applications');
    } finally {
      setIsLoading(false);
    }
  };

  const loadRoles = async () => {
    try {
      const roles = await getRoles();
      setExistingRoles(roles);
    } catch (err) {
      console.error('Failed to load roles');
    }
  };

  const filteredAndSortedApplications = useMemo(() => {
    let filtered = [...applications];

    if (searchQuery) {
      filtered = filtered.filter(app =>
        app.company.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    switch (sortBy) {
      case 'newest':
        filtered.sort((a, b) => new Date(b.applied_date) - new Date(a.applied_date));
        break;
      case 'oldest':
        filtered.sort((a, b) => new Date(a.applied_date) - new Date(b.applied_date));
        break;
      case 'company-asc':
        filtered.sort((a, b) => a.company.localeCompare(b.company));
        break;
      case 'company-desc':
        filtered.sort((a, b) => b.company.localeCompare(a.company));
        break;
      case 'salary-high':
        filtered.sort((a, b) => (b.salary || 0) - (a.salary || 0));
        break;
      case 'salary-low':
        filtered.sort((a, b) => (a.salary || 0) - (b.salary || 0));
        break;
      default:
        break;
    }

    return filtered;
  }, [applications, searchQuery, sortBy]);

  const handleCreate = () => {
    setEditingApplication(null);
    setShowForm(true);
  };

  const handleEdit = (application) => {
    setEditingApplication(application);
    setShowForm(true);
  };

  const handleFormSubmit = async (formData) => {
    try {
      setIsLoading(true);
      setError('');

      if (editingApplication) {
        await updateApplication(
          editingApplication.id,
          formData.company,
          formData.role,
          formData.status,
          formData.appliedDate,
          formData.notes || null,
          formData.followUp || false,
          formData.jobId || null,
          formData.salary ? parseInt(formData.salary) : null
        );
      } else {
        await createApplication(
          formData.company,
          formData.role,
          formData.status,
          formData.appliedDate,
          formData.notes || null,
          formData.followUp || false,
          formData.jobId || null,
          formData.salary ? parseInt(formData.salary) : null
        );
      }

      setShowForm(false);
      setEditingApplication(null);
      await loadApplications();
      await loadRoles();
    } catch (err) {
      setError(err.message || 'Failed to save application');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this application?')) {
      return;
    }

    try {
      setIsLoading(true);
      await deleteApplication(id);
      await loadApplications();
    } catch (err) {
      setError(err.message || 'Failed to delete application');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleFilterChange = (status) => {
    setStatusFilter(status);
  };

  const handleStatusUpdate = () => {
    loadApplications();
  };

  const clearAdvancedFilters = () => {
    setRoleFilter('');
    setMinSalary('');
    setMaxSalary('');
  };

  const displayApplications = viewMode === 'board' && !statusFilter ? applications : filteredAndSortedApplications;

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>ApplyRec</h1>
        <div className={styles.headerActions}>
          <Button onClick={handleCreate} disabled={showForm}>
            Add Application
          </Button>
          <Button variant="secondary" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </header>

      <main className={styles.main}>
        {showForm ? (
          <div className={styles.formContainer}>
            <ApplicationForm
              application={editingApplication}
              onSubmit={handleFormSubmit}
              onCancel={() => {
                setShowForm(false);
                setEditingApplication(null);
              }}
              isLoading={isLoading}
              existingRoles={existingRoles}
            />
          </div>
        ) : (
          <>
            <Statistics applications={applications} />

            <div className={styles.controls}>
              <div className={styles.controlsLeft}>
                <SearchBar searchQuery={searchQuery} onSearchChange={setSearchQuery} />
              </div>
              <div className={styles.controlsRight}>
                <SortOptions sortBy={sortBy} onSortChange={setSortBy} />
                {!statusFilter && (
                  <div className={styles.viewToggle}>
                    <button
                      className={`${styles.viewButton} ${viewMode === 'grid' ? styles.active : ''}`}
                      onClick={() => setViewMode('grid')}
                    >
                      Grid
                    </button>
                    <button
                      className={`${styles.viewButton} ${viewMode === 'board' ? styles.active : ''}`}
                      onClick={() => setViewMode('board')}
                    >
                      Board
                    </button>
                  </div>
                )}
              </div>
            </div>

            <AdvancedFilters
              roles={existingRoles}
              selectedRole={roleFilter}
              onRoleChange={setRoleFilter}
              minSalary={minSalary}
              maxSalary={maxSalary}
              onMinSalaryChange={setMinSalary}
              onMaxSalaryChange={setMaxSalary}
              onClear={clearAdvancedFilters}
            />

            <FilterBar selectedStatus={statusFilter} onFilterChange={handleFilterChange} />

            {error && <div className={styles.error}>{error}</div>}

            {isLoading && !applications.length ? (
              <div className={styles.loading}>Loading applications...</div>
            ) : displayApplications.length === 0 ? (
              <div className={styles.empty}>
                <p>No applications found.</p>
                <Button onClick={handleCreate}>Add Your First Application</Button>
              </div>
            ) : viewMode === 'board' && !statusFilter ? (
              <TrelloBoard
                applications={applications}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onStatusUpdate={handleStatusUpdate}
              />
            ) : (
              <div className={styles.grid}>
                {displayApplications.map((app) => (
                  <ApplicationCard
                    key={app.id}
                    application={app}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}

export default Dashboard;
