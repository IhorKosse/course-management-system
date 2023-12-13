import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import EditCourseForm from "./EditCourseForm";
import AddCourseForm from "./AddCourseForm";
function CourseList() {
  const [courses, setCourses] = useState([]);
  const userRole = localStorage.getItem("role");

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/courses");
        setCourses(response.data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, []);

  const [editingCourseId, setEditingCourseId] = useState(null);

  const handleEditCourse = (courseId) => {
    setEditingCourseId(courseId); // Встановлюємо ID курсу для редагування
  };
  const closeEditForm = () => {
    setEditingCourseId(null); // Закриваємо форму редагування
  };
  const handleDeleteCourse = async (courseId) => {
    if (window.confirm("Ви впевнені, що хочете видалити цей курс?")) {
      try {
        await axios.delete(`http://localhost:3001/api/courses/${courseId}`);
        setCourses(courses.filter((course) => course.id !== courseId));
      } catch (error) {
        console.error("Помилка при видаленні курсу", error);
      }
    }
  };
  const [isAddingCourse, setIsAddingCourse] = useState(false);

  const handleAddCourse = () => {
    setIsAddingCourse(true); // Відкрити форму додавання курсу
  };

  const closeAddForm = () => {
    setIsAddingCourse(false); // Закрити форму додавання курсу
  };
  const refreshCourses = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/courses");
      setCourses(response.data);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };
console.log(localStorage.getItem('id'))
  const handleEnroll = async (courseId,studentId) => {
    // Тут логіка для відправлення запиту на бекенд для запису на курс
    try {
      await axios.post(`http://localhost:3001/api/enroll`, { courseId, studentId });
      // Можете додати оновлення UI або повідомлення про успішну реєстрацію
    } catch (error) {
      console.error("Помилка при записі на курс", error);
    }
  };
  return (
    <div className="container mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-700">Courses</h2>
        {userRole === "teacher" && (
          <button
            onClick={handleAddCourse}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-300"
          >
            Додати Курс
          </button>
        )}
      </div>
      {editingCourseId && (
        <EditCourseForm
          courseId={editingCourseId}
          closeForm={closeEditForm}
          refreshCourses={refreshCourses}
        />
      )}
      {isAddingCourse && (
        <AddCourseForm
          closeForm={closeAddForm}
          refreshCourses={refreshCourses}
        />
      )}

      <ul className="space-y-4">
        {courses.map((course) => (
          <li key={course.id} className="border-b pb-4">
            <Link
              to={`/courses/${course.id}`}
              className="text-blue-500 hover:text-blue-600 transition duration-300 text-lg font-semibold"
            >
              {course.name}
            </Link>
            <div className="mt-2 flex items-center">
              {userRole === "admin" && (
                <button
                  onClick={() => handleDeleteCourse(course.id)}
                  className="ml-2 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition duration-300"
                >
                  Видалити
                </button>
              )}
              {(userRole === "admin" || userRole === "teacher") && (
                <button
                  onClick={() => handleEditCourse(course.id)}
                  className="ml-2 bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition duration-300"
                >
                  Редагувати
                </button>
              )}
               {/* Існуючий код для кожного курсу */}
            {userRole === "student" && (
              <button
                onClick={() => handleEnroll(course.id, localStorage.getItem('id'))}
                className="ml-2 bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition duration-300"
              >
                Приєднатися до Курсу
              </button>
            )}
            </div>
            
          </li>
          
        ))}
      </ul>
      
    </div>
  );
}

export default CourseList;
