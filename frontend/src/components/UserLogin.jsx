import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
function UserLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage('');

    try {
      const response = await axios.post('http://localhost:3001/api/login', {
        email,
        password,
      });

      if (response.data.success) {
        // Очищення полів та перенаправлення на головну сторінку
        setEmail('');
        setPassword('');
        localStorage.setItem('role', response.data.role); // Збереження ролі в localStorage
        localStorage.setItem('id', response.data.id);
        navigate('/'); 
      } else {
        setErrorMessage('Login failed. Please try again.');
      }
    } catch (error) {
      if (error.response) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage('Error');
      }
    }
  };

  return (
    <div className="container mx-auto mt-10 p-5 border border-gray-300 rounded-md">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-2">Email:</label>
          <input
            className="w-full p-2 border border-gray-300 rounded-md"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label className="block mb-2">Password:</label>
          <input
            className="w-full p-2 border border-gray-300 rounded-md"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default UserLogin;
