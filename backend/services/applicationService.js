const applicationModel = require('../models/applicationModel');

const VALID_STATUSES = ['Applied', 'OA', 'Interview', 'Rejected', 'Offer'];

function validateStatus(status) {
  return VALID_STATUSES.includes(status);
}

function validateApplicationData(company, role, status, appliedDate) {
  if (!company || !role || !status || !appliedDate) {
    throw new Error('All fields are required');
  }

  if (!validateStatus(status)) {
    throw new Error('Invalid status');
  }

  return true;
}

async function createApplication(userId, company, role, status, appliedDate, notes = null, followUp = false) {
  validateApplicationData(company, role, status, appliedDate);
  const applicationId = await applicationModel.createApplication(
    userId,
    company,
    role,
    status,
    appliedDate,
    notes,
    followUp
  );
  return applicationId;
}

async function getApplications(userId, statusFilter) {
  if (statusFilter && !validateStatus(statusFilter)) {
    throw new Error('Invalid status filter');
  }
  return await applicationModel.getApplicationsByUserId(userId, statusFilter);
}

async function getApplication(id, userId) {
  const application = await applicationModel.getApplicationById(id, userId);
  if (!application) {
    throw new Error('Application not found');
  }
  return application;
}

async function updateApplication(id, userId, company, role, status, appliedDate, notes = null, followUp = false) {
  validateApplicationData(company, role, status, appliedDate);
  
  const application = await applicationModel.getApplicationById(id, userId);
  if (!application) {
    throw new Error('Application not found');
  }

  const success = await applicationModel.updateApplication(
    id,
    userId,
    company,
    role,
    status,
    appliedDate,
    notes,
    followUp
  );

  if (!success) {
    throw new Error('Failed to update application');
  }

  return true;
}

async function updateApplicationStatus(id, userId, status) {
  if (!validateStatus(status)) {
    throw new Error('Invalid status');
  }

  const application = await applicationModel.getApplicationById(id, userId);
  if (!application) {
    throw new Error('Application not found');
  }

  const success = await applicationModel.updateApplicationStatus(id, userId, status);
  if (!success) {
    throw new Error('Failed to update status');
  }

  return true;
}

async function deleteApplication(id, userId) {
  const application = await applicationModel.getApplicationById(id, userId);
  if (!application) {
    throw new Error('Application not found');
  }

  const success = await applicationModel.deleteApplication(id, userId);
  if (!success) {
    throw new Error('Failed to delete application');
  }

  return true;
}

module.exports = {
  createApplication,
  getApplications,
  getApplication,
  updateApplication,
  updateApplicationStatus,
  deleteApplication,
  validateStatus
};
