import { apiRequest } from './api';

async function createApplication(company, role, status, appliedDate, notes, followUp, jobId, salary) {
  return await apiRequest('/applications', {
    method: 'POST',
    body: { company, role, status, appliedDate, notes, followUp, jobId, salary },
  });
}

async function getApplications(filters = {}) {
  const params = new URLSearchParams();
  
  if (filters.status) params.append('status', filters.status);
  if (filters.role) params.append('role', filters.role);
  if (filters.minSalary) params.append('minSalary', filters.minSalary);
  if (filters.maxSalary) params.append('maxSalary', filters.maxSalary);
  
  const queryString = params.toString();
  const endpoint = queryString ? `/applications?${queryString}` : '/applications';
  
  const response = await apiRequest(endpoint, { method: 'GET' });
  return response.applications;
}

async function getApplication(id) {
  const response = await apiRequest(`/applications/${id}`, { method: 'GET' });
  return response.application;
}

async function updateApplication(id, company, role, status, appliedDate, notes, followUp, jobId, salary) {
  return await apiRequest(`/applications/${id}`, {
    method: 'PUT',
    body: { company, role, status, appliedDate, notes, followUp, jobId, salary },
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

async function getRoles() {
  const response = await apiRequest('/applications/roles', { method: 'GET' });
  return response.roles;
}

export {
  createApplication,
  getApplications,
  getApplication,
  updateApplication,
  updateApplicationStatus,
  deleteApplication,
  getRoles,
};
