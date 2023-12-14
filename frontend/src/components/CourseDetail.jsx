import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function CourseDetail() {
  const [course, setCourse] = useState(null);
  const { id } = useParams();
  const userRole = localStorage.getItem('role');
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    const fetchCourseDetail = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/courses/${id}`);
        setCourse(response.data);

        if (userRole === 'student') {
          const assignmentsResponse = await axios.get(`http://localhost:3001/api/assignments/${id}`);
          setAssignments(assignmentsResponse.data);
        }
      } catch (error) {
        console.error("Error fetching course details:", error);
      }
    };

    fetchCourseDetail();
  }, [id, userRole]);

  if (!course) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto mt-10 p-5 bg-white shadow-lg rounded-lg">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-blue-600 mb-2">{course.name}</h2>
        <p className="text-gray-700 text-lg">{course.description}</p>
      </div>

      {userRole === 'student' && (
        <div>
          <h3 className="text-xl font-semibold text-blue-500 mt-5 mb-3">Assignments</h3>
          <ul className="list-disc list-inside">
            {assignments.map(assignment => (
              <li key={assignment.id} className="text-gray-600 mb-2">
                <span className="font-semibold">{assignment.name}:</span> {assignment.description}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default CourseDetail;
