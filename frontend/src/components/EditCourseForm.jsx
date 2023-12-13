import React, { useState, useEffect } from 'react';
import axios from 'axios';

function EditCourseForm({ courseId, closeForm, refreshCourses }) {
  const [courseData, setCourseData] = useState({ name: '', description: '' });

  useEffect(() => {
    // Завантажити поточні дані курсу
    const fetchCourseData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/courses/${courseId}`);
        setCourseData(response.data);
      } catch (error) {
        console.error("Error fetching course data:", error);
      }
    };

    fetchCourseData();
  }, [courseId]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.put(`http://localhost:3001/api/courses/${courseId}`, courseData);
      closeForm(); // Закрити форму після оновлення
      await refreshCourses(); // Перезавантажити список курсів
    } catch (error) {
      console.error("Error updating course:", error);
    }
  };
  const handleChange = (event) => {
    setCourseData({ ...courseData, [event.target.name]: event.target.value });
  };

   return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
      <div className="bg-white p-5 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Редагувати Курс</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700">Назва Курсу:</label>
            <input
              type="text"
              name="name"
              value={courseData.name}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mt-1"
            />
          </div>
          <div>
            <label className="block text-gray-700">Опис:</label>
            <textarea
              name="description"
              value={courseData.description}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mt-1"
            />
          </div>
          <div className="flex justify-between items-center">
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300">
              Оновити Курс
            </button>
            <button onClick={closeForm} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-300">
              Скасувати
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditCourseForm;
