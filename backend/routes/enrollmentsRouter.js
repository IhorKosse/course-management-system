const express = require('express');
const enrollmentsController = require('../controllers/enrollmentsController');
const router = express.Router();

// Маршрут для запису на курс
router.post('/enroll', enrollmentsController.enrollStudent);
router.get('/enrollments', enrollmentsController.getAllEnrollments);
router.get('/enrollments/:courseId', enrollmentsController.getEnrollmentsByCourse);
module.exports = router;