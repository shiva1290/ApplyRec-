import { apiRequest } from './api';

async function createApplication(company, role, status, appliedDate, notes = null, followUp = false) {
  return await apiRequest('/applications', {
    method: 'POST',
    body: { company, role, status, appliedDate, notes, followUp },
  });
}

async function getApplications(statusFilter = null) {
  const endpoint = statusFilter ? `/applications?status=${statusFilter}` : '/applications';
  const response = await apiRequest(endpoint, { method: 'GET' });
  return response.applications;
}

async function getApplication(id) {
  const response = await apiRequest(`/applications/${id}`, { method: 'GET' });
  return response.application;
}

async function updateApplication(id, company, role, status, appliedDate, notes = null, followUp = false) {
  return await apiRequest(`/applications/${id}`, {
    method: 'PUT',
    body: { company, role, status, appliedDate, notes, followUp },
  });
}

async function updateApplicationStatus(id, status) {
  return await apiRequest(`/applications/${id}/status`, {
    method: 'PATCH',
    body: { status },
  });
}

async function deleteApplication(id) {
  return await apiRequest(`/applications/${id}`, { method: 'DELETE' });
}

export {
  createApplication,
  getApplications,
  getApplication,
  updateApplication,
  updateApplicationStatus,
  deleteApplication,
};
