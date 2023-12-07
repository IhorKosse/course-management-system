const express = require('express');
const coursesController = require('../controllers/coursesController');
const router = express.Router();

// Отримання всіх курсів
router.get('/', coursesController.getAllCourses);

// Отримання деталей курсу
router.get('/:id', coursesController.getCourseDetails);

// Додавання нового курсу
router.post('/', coursesController.addCourse);

// Оновлення інформації про курс
router.put('/:id', coursesController.updateCourse);

// Видалення курсу
router.delete('/:id', coursesController.deleteCourse);

module.exports = router;
