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
// Отримання деталей конкретного курсу
exports.getCourseDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const course = await pool.query("SELECT * FROM courses WHERE id = $1", [id]);

    if (course.rows.length === 0) {
      return res.status(404).json({ message: "Курс не знайдено" });
    }

    res.json(course.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// Отримання деталей конкретного курсу

// Оновлення інформації про курс
exports.updateCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;
    const updateCourse = await pool.query(
      "UPDATE courses SET name = $1, description = $2 WHERE id = $3 RETURNING *",
      [name, description, id]
    );

    if (updateCourse.rows.length === 0) {
      return res.status(404).json({ message: "Курс не знайдено" });
    }

    res.json(updateCourse.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// Видалення курсу
exports.deleteCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteCourse = await pool.query("DELETE FROM courses WHERE id = $1 RETURNING *", [id]);

    if (deleteCourse.rows.length === 0) {
      return res.status(404).json({ message: "Курс не знайдено" });
    }

    res.json({ message: "Курс видалено" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// Додавання нового курсу
exports.addCourse = async (req, res) => {
  try {
    const { name, description } = req.body;
    const newCourse = await pool.query(
      "INSERT INTO courses (name, description) VALUES ($1, $2) RETURNING *",
      [name, description]
    );

    res.json(newCourse.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Додавання, оновлення, видалення та отримання деталей курсу будуть мати схожу структуру
