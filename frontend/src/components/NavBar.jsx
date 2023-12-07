import React from 'react';

function NavBar() {
  return (
    <nav className="bg-blue-500 text-white p-4">
      <ul className="flex space-x-4">
        <li><a href="/" className="hover:text-blue-200">Home</a></li>
        <li><a href="/courses" className="hover:text-blue-200">Courses</a></li>
        <li><a href="/login" className="hover:text-blue-200">Login</a></li>
        <li><a href="/register" className="hover:text-blue-200">Register</a></li>
      </ul>
    </nav>
  );
}

export default NavBar;
