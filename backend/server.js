const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const pool = require('./db'); // Переконайтеся, що у вас є файл db.js з налаштуваннями підключення

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Тестовий маршрут для перевірки сервера
app.get('/', (req, res) => {
  res.json({ message: 'Course Management System Backend is running.' });
});

// Маршрут для отримання всіх користувачів
app.get('/users', async (req, res) => {
  try {
    const allUsers = await pool.query("SELECT * FROM users");
    res.json(allUsers.rows);
  } catch (err) {
    console.error(err.message);
  }
});

// Маршрут для отримання всіх курсів
app.get('/courses', async (req, res) => {
  try {
    const allCourses = await pool.query("SELECT * FROM courses");
    res.json(allCourses.rows);
  } catch (err) {
    console.error(err.message);
  }
});

// Ваші інші маршрути та API-функції тут...

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
