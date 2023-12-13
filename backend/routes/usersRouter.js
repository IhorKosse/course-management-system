const express = require('express');
const usersController = require('../controllers/usersController');
const router = express.Router();

// ...інші маршрути...

router.post('/login', usersController.login);

module.exports = router;
