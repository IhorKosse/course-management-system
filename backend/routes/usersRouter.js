const express = require('express');
const usersController = require('../controllers/usersController');
const router = express.Router();

// Реєстрація користувача
router.post('/register', usersController.register);

// Вхід користувача
router.post('/login', usersController.login);

// Отримання інформації профілю
router.get('/profile', usersController.getProfile);

// Оновлення інформації профілю
router.put('/profile', usersController.updateProfile);

module.exports = router;
