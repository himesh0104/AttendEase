import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import FacultyLoginPage from "./pages/FacultyLoginPage";
import StudentLoginPage from "./pages/StudentLoginPage";
import SignUpPage from "./pages/SignUpPage";
import StudentDashboard from "./pages/StudentDashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/faculty-login" element={<FacultyLoginPage />} />
        <Route path="/student-login" element={<StudentLoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/student-dashboard" element={<StudentDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
