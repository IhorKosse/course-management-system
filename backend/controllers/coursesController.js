const pool = require('../db');

// Отримання всіх курсів
exports.getAllCourses = async (req, res) => {
  try {
    const allCourses = await pool.query("SELECT * FROM courses");
    res.json(allCourses.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Додавання, оновлення, видалення та отримання деталей курсу будуть мати схожу структуру
