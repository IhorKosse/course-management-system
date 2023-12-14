const express = require('express');
const assignmentsController = require('../controllers/assignmentsController');
const router = express.Router();

router.get('/assignments/:id', assignmentsController.getAssignmentsForCourse);

module.exports = router;