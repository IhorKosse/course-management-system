import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
function UserProfile() {
  const [courses, setCourses] = useState([]);
  const userRole = localStorage.getItem("role");
  const userId = localStorage.getItem("id");

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        let coursesData = [];
        if (userRole === "student") {
          const enrollmentsResponse = await axios.get(
            `http://localhost:3001/api/enrollments`
          );
          const enrolledCourses = enrollmentsResponse.data.filter(
            (enrollment) => enrollment.student_id === parseInt(userId)
          );
          const coursesResponse = await axios.get(
            `http://localhost:3001/api/courses`
          );
          coursesData = coursesResponse.data.filter((course) =>
            enrolledCourses.some(
              (enrollment) => enrollment.course_id === course.id
            )
          );
        } else if (userRole === "teacher") {
          const coursesResponse = await axios.get(
            `http://localhost:3001/api/courses`
          );
          coursesData = coursesResponse.data.filter(
            (course) => course.teacher_id === parseInt(userId)
          );
        }

        setCourses(coursesData);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, [userId, userRole]);

  return (
    <div className="container mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">Your Profile</h2>
      <div>
        <h3 className="text-xl font-semibold mb-3">
          {userRole === "student"
            ? "Courses You're Enrolled In"
            : "Courses You're Teaching"}
        </h3>
        {courses.length > 0 ? (
          <ul className="bg-white rounded-lg border border-gray-200 w-96 text-gray-900">
            {courses.map((course) => (
              <li
                key={course.id}
                className="px-6 py-2 border-b border-gray-200 w-full rounded-t-lg"
              >
                <Link
                  to={`/courses/${course.id}`}
                  className="hover:text-blue-600"
                >
                  {course.name}
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p>
            {userRole === "student"
              ? "You are not enrolled in any courses."
              : "You are not teaching any courses."}
          </p>
        )}
      </div>
    </div>
  );
}

export default UserProfile;
