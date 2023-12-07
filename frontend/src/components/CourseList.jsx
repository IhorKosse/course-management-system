import React, { useState, useEffect } from 'react';
import axios from 'axios'; // або використовуйте fetch
import { Link } from 'react-router-dom';
function CourseList() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/courses');
        setCourses(response.data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div className="container mx-auto mt-10">
    <h2 className="text-2xl font-bold">Courses</h2>
    <ul>
      {courses.map(course => (
        <li key={course.id}>
          <Link to={`/courses/${course.id}`}>{course.name}</Link>
        </li>
      ))}
    </ul>
  </div>
  );
}

export default CourseList;
