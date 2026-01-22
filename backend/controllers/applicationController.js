const applicationService = require('../services/applicationService');

async function createApplication(req, res) {
  try {
    const { company, role, status, appliedDate, notes, followUp, jobId, salary } = req.body;
    const userId = req.userId;

    const applicationId = await applicationService.createApplication(
      userId,
      company,
      role,
      status,
      appliedDate,
      notes || null,
      followUp || false,
      jobId || null,
      salary ? parseInt(salary) : null
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
    const filters = {
      status: req.query.status || null,
      role: req.query.role || null,
      minSalary: req.query.minSalary ? parseInt(req.query.minSalary) : null,
      maxSalary: req.query.maxSalary ? parseInt(req.query.maxSalary) : null
    };

    const applications = await applicationService.getApplications(userId, filters);
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
    const { company, role, status, appliedDate, notes, followUp, jobId, salary } = req.body;
    const userId = req.userId;

    await applicationService.updateApplication(
      parseInt(id),
      userId,
      company,
      role,
      status,
      appliedDate,
      notes || null,
      followUp || false,
      jobId || null,
      salary ? parseInt(salary) : null
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

async function getRoles(req, res) {
  try {
    const userId = req.userId;
    const roles = await applicationService.getUniqueRoles(userId);
    res.json({ roles });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = {
  createApplication,
  getApplications,
  getApplication,
  updateApplication,
  updateApplicationStatus,
  deleteApplication,
  getRoles
};
