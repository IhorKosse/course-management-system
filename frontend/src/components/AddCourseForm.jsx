import React, { useState } from 'react';
import axios from 'axios';

function AddCourseForm({ closeForm, refreshCourses }) {
  const [courseData, setCourseData] = useState({ name: '', description: '' });

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post('http://localhost:3001/api/courses', courseData);
      closeForm(); // Закрити форму після додавання
      await refreshCourses(); // Оновити список курсів
    } catch (error) {
      console.error("Error adding course:", error);
    }
  };

  const handleChange = (event) => {
    setCourseData({ ...courseData, [event.target.name]: event.target.value });
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
      <div className="bg-white p-5 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Додати Новий Курс</h2>
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
              Додати Курс
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

export default AddCourseForm;
