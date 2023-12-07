import NavBar from "./components/NavBar";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import CourseList from "./components/CourseList";
import CourseDetail from "./components/CourseDetail";
import UserLogin from "./components/UserLogin";
import UserRegistration from "./components/UserRegistration";
import UserProfile from "./components/UserProfile";

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/courses" element={<CourseList />} />
        <Route path="/courses/:id" element={<CourseDetail />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/register" element={<UserRegistration />} />
        <Route path="/profile" element={<UserProfile />} />
        {/* Можна додати більше маршрутів за потреби */}
      </Routes>
    </Router>
  );
}

export default App;
