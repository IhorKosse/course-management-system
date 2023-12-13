// Припустимо, у вас є файл pool.js з налаштуваннями для підключення до вашої PostgreSQL бази даних.
const pool = require('../db');

const usersController = {
  // ...інші методи...

  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      const userQuery = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

      if (userQuery.rows.length === 0) {
        return res.status(401).json({ success: false, message: 'Користувача не знайдено' });
      }

      const user = userQuery.rows[0];

      // Припустимо, що паролі зберігаються як прості строки у базі даних.
      if (password !== user.password) {
        return res.status(401).json({ success: false, message: 'Неправильний пароль' });
      }

      res.json({ success: true, role: user.role, id: user.id});
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = usersController;
