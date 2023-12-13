const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const pool = require('./db');
const coursesRouter = require('./routes/coursesRouter'); // Додано цей рядок
const usersRouter = require('./routes/usersRouter');
const enrollmentsRouter = require('./routes/enrollmentsRouter');
const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.json({ message: 'Course Management System Backend is running.' });
});

app.get('/users', async (req, res) => {
  try {
    const allUsers = await pool.query("SELECT * FROM users");
    res.json(allUsers.rows);
  } catch (err) {
    console.error(err.message);
  }
});

app.use('/api/courses', coursesRouter); // Додано цей рядок
app.use(express.json());
app.use('/api', usersRouter);
app.use('/api', enrollmentsRouter);
// Ваші інші маршрути та API-функції тут...

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
