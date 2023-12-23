const pool = require('../db'); // Імпортуйте пул з'єднань з базою даних

exports.enrollStudent = async (req, res) => {
  const { studentId, courseId } = req.body;

  try {
    const newEnrollment = await pool.query(
      "INSERT INTO enrollments (student_id, course_id) VALUES ($1, $2) RETURNING *",
      [studentId, courseId]
    );

    res.json(newEnrollment.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
exports.getAllEnrollments = async (req, res) => {
    try {
      const allEnrollments = await pool.query("SELECT * FROM enrollments");
      res.json(allEnrollments.rows);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  exports.getEnrollmentsByCourse = async (req, res) => {
    const courseId = parseInt(req.params.courseId);
  
    try {
      const enrollments = await pool.query(
        "SELECT e.*, u.username FROM enrollments e INNER JOIN users u ON e.student_id = u.id WHERE e.course_id = $1",
        [courseId]
      );
      res.json(enrollments.rows);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };