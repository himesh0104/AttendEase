import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import FacultyLoginPage from "./pages/FacultyLoginPage";
import StudentLoginPage from "./pages/StudentLoginPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/faculty-login" element={<FacultyLoginPage />} />
        <Route path="/student-login" element={<StudentLoginPage />} />
      </Routes>
    </Router>
  );
}

export default App;
