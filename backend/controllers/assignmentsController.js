const pool = require('../db');

exports.getAssignmentsForCourse = async (req, res) => {
  const courseId = parseInt(req.params.id);
  
  try {
    const assignments = await pool.query(
      "SELECT * FROM assignments WHERE course_id = $1", 
      [courseId]
    );
    res.json(assignments.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};