const express = require('express');
const router = express.Router();
const applicationController = require('../controllers/applicationController');
const { authenticateToken } = require('../middleware/authMiddleware');

router.use(authenticateToken);

router.post('/', applicationController.createApplication);
router.get('/', applicationController.getApplications);
router.get('/roles', applicationController.getRoles);
router.get('/:id', applicationController.getApplication);
router.put('/:id', applicationController.updateApplication);
router.patch('/:id/status', applicationController.updateApplicationStatus);
router.delete('/:id', applicationController.deleteApplication);

module.exports = router;
