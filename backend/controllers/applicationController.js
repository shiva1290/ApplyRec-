const applicationService = require('../services/applicationService');

async function createApplication(req, res) {
  try {
    const { company, role, status, appliedDate, notes, followUp } = req.body;
    const userId = req.userId;

    const applicationId = await applicationService.createApplication(
      userId,
      company,
      role,
      status,
      appliedDate,
      notes || null,
      followUp || false
    );

    res.status(201).json({
      message: 'Application created successfully',
      applicationId
    });
  } catch (error) {
    if (error.message === 'All fields are required' || error.message === 'Invalid status') {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function getApplications(req, res) {
  try {
    const userId = req.userId;
    const statusFilter = req.query.status || null;

    const applications = await applicationService.getApplications(userId, statusFilter);
    res.json({ applications });
  } catch (error) {
    if (error.message === 'Invalid status filter') {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function getApplication(req, res) {
  try {
    const { id } = req.params;
    const userId = req.userId;

    const application = await applicationService.getApplication(parseInt(id), userId);
    res.json({ application });
  } catch (error) {
    if (error.message === 'Application not found') {
      return res.status(404).json({ error: error.message });
    }
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function updateApplication(req, res) {
  try {
    const { id } = req.params;
    const { company, role, status, appliedDate, notes, followUp } = req.body;
    const userId = req.userId;

    await applicationService.updateApplication(
      parseInt(id),
      userId,
      company,
      role,
      status,
      appliedDate,
      notes || null,
      followUp || false
    );

    res.json({ message: 'Application updated successfully' });
  } catch (error) {
    if (error.message === 'Application not found' || error.message === 'Failed to update application') {
      return res.status(404).json({ error: error.message });
    }
    if (error.message === 'All fields are required' || error.message === 'Invalid status') {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function updateApplicationStatus(req, res) {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const userId = req.userId;

    await applicationService.updateApplicationStatus(parseInt(id), userId, status);

    res.json({ message: 'Application status updated successfully' });
  } catch (error) {
    if (error.message === 'Application not found' || error.message === 'Failed to update status') {
      return res.status(404).json({ error: error.message });
    }
    if (error.message === 'Invalid status') {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function deleteApplication(req, res) {
  try {
    const { id } = req.params;
    const userId = req.userId;

    await applicationService.deleteApplication(parseInt(id), userId);
    res.json({ message: 'Application deleted successfully' });
  } catch (error) {
    if (error.message === 'Application not found' || error.message === 'Failed to delete application') {
      return res.status(404).json({ error: error.message });
    }
    res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = {
  createApplication,
  getApplications,
  getApplication,
  updateApplication,
  updateApplicationStatus,
  deleteApplication
};
