import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function CourseDetail() {
  const [course, setCourse] = useState(null);
  const { id } = useParams();
  const userRole = localStorage.getItem("role");
  const studentId = localStorage.getItem("id");
  const [assignments, setAssignments] = useState([]);
  const [grades, setGrades] = useState([]);
  const [enrolledStudents, setEnrolledStudents] = useState([]);
  // const [selectedAssignmentId, setSelectedAssignmentId] = useState(null);
  // const [selectedStudentId, setSelectedStudentId] = useState(null);
  // const [grade, setGrade] = useState(null);
  useEffect(() => {
    const fetchCourseDetail = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/api/courses/${id}`
        );
        setCourse(response.data);

        if (userRole === "student" || userRole === "teacher") {
          const assignmentsResponse = await axios.get(
            `http://localhost:3001/api/assignments/${id}`
          );
          //  console.log(assignmentsResponse);
          setAssignments(assignmentsResponse.data);
        }
        if (userRole === "student" ) {
          const gradesResponse = await axios.get(
            `http://localhost:3001/api/grades/${id}`,
            {
              params: { studentId: studentId },
            }
          );
          console.log("Grades:", gradesResponse.data); // Виведення оцінок у консоль
          setGrades(gradesResponse.data);
        }
        else if (userRole === "teacher"){
          const gradesResponse = await axios.get(
            'http://localhost:3001/api/grades'
          );
          setGrades(gradesResponse.data);
        }
      } catch (error) {
        console.error("Error fetching course details:", error);
      }
    };
    const fetchEnrolledStudents = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/api/enrollments/${id}`
        );
        console.log(response.data)
        setEnrolledStudents(response.data);
      } catch (error) {
        console.error("Error fetching enrolled students:", error);
      }
    };

    fetchCourseDetail();
    if (userRole === "teacher") {
      fetchEnrolledStudents();
    }
  }, [id, userRole, studentId]);

  const handleGradeChange = async (studentId, assignmentId, newGrade) => {
    try {
      // Створюємо об'єкт із даними, які будуть відправлені
      const gradeData = {
        student_id: studentId,
        assignment_id: assignmentId,
        grade: newGrade,
      };

      // Відправляємо POST-запит для оновлення або додавання оцінки
      const response = await axios.post(
        `http://localhost:3001/api/grades`,
        gradeData
      );

      // Опрацювання відповіді від сервера
      // console.log(response.data);
      // Тут можна додати код для оновлення стану, якщо це необхідно
    } catch (error) {
      console.error("Error submitting grade:", error);
    }
  };
  if (!course) {
    return <div>Loading...</div>;
  }
  // console.log(assignments);
  console.log(grades.find(grade => grade.assignment_id === assignments[0].id)?.grade);
  return (
    <div className="container mx-auto mt-10 p-5 bg-white shadow-lg rounded-lg">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-blue-600 mb-2">{course.name}</h2>
        <p className="text-gray-700 text-lg">{course.description}</p>
      </div>

      {userRole === "student" && (
        <div>
          <h3 className="text-xl font-semibold text-blue-500 mt-5 mb-3">
            Assignments
          </h3>
          <div className="space-y-4">
            {assignments.map((assignment) => (
              <div
                key={assignment.id}
                className="p-4 border border-gray-200 rounded-lg"
              >
                <h4 className="font-semibold text-lg">{assignment.name}</h4>
                <p className="text-gray-600">{assignment.description}</p>
                <span className="text-sm font-medium text-green-500">
                  {grades.find((grade) => grade.assignment_id === assignment.id)
                    ? `Grade: ${
                        grades.find(
                          (grade) => grade.assignment_id === assignment.id
                        ).grade
                      }`
                    : "Not graded yet"}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
      {userRole === "teacher" && (
  <div>
    <h3>Enrolled Students</h3>
    {enrolledStudents.map(student => (
      <div key={student.id}>
        <h4>{student.username}</h4>
        <div className="space-y-4">
          {assignments.map((assignment) => (
            <div key={assignment.id} className="p-4 border border-gray-200 rounded-lg">
              <span className="font-semibold text-lg">{assignment.name}</span>
              <div>
                <span>Grade: </span>
                <span>
                  {grades.find(grade => grade.assignment_id === assignment.id && grade.student_id === student.student_id)?.grade || "Not graded yet"}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    ))}
  </div>
)}

    </div>
  );
}

export default CourseDetail;
