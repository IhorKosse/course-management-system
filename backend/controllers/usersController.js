const pool = require('../db'); // Припускаючи, що ви використовуєте PostgreSQL з пакетом 'pg'

// Реєстрація користувача
exports.register = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    // Додайте валідацію та хешування паролю тут

    // Вставка користувача у базу даних
    const newUser = await pool.query(
      "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *",
      [username, email, password] // Переконайтеся, що пароль хешовано
    );

    res.json(newUser.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Отримання профілю користувача
exports.getProfile = async (req, res) => {
  // Реалізуйте логіку для отримання даних профілю користувача
};
