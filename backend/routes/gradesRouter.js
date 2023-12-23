const express = require('express');
const gradesController = require('../controllers/gradesController');
const router = express.Router();

router.get('/grades/:courseId', gradesController.getGradesForStudent);
router.post('/grades', gradesController.addGrade);
router.get('/grades', gradesController.getAllGrades);
module.exports = router;