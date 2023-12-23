const pool = require('../db');

exports.getGradesForStudent = async (req, res) => {
  const courseId = parseInt(req.params.courseId);
  const studentId = parseInt(req.query.studentId);

  try {
    const grades = await pool.query(
      "SELECT g.* FROM grades g INNER JOIN assignments a ON g.assignment_id = a.id WHERE a.course_id = $1 AND g.student_id = $2",
      [courseId, studentId]
    );
    res.json(grades.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.addGrade = async (req, res) => {
    const { assignment_id, student_id, grade } = req.body;
  
    try {
      const newGrade = await pool.query(
        "INSERT INTO grades (assignment_id, student_id, grade) VALUES ($1, $2, $3) RETURNING *",
        [assignment_id, student_id, grade]
      );
      res.json(newGrade.rows[0]);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  exports.getAllGrades = async (req, res) => {
    try {
      const allGrades = await pool.query("SELECT * FROM grades");
      res.json(allGrades.rows);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };