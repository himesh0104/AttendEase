import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { FacultyProvider } from "./contexts/FacultyContext";
import { useAuth } from "./contexts/AuthContext";
import HomePage from "./pages/HomePage";
import FacultyLoginPage from "./pages/FacultyLoginPage";
import StudentLoginPage from "./pages/StudentLoginPage";
import SignUpPage from "./pages/SignUpPage";
import StudentDashboard from "./pages/StudentDashboard";
import FacultyDashboard from "./pages/FacultyDashboard";
import QRGenerator from "./pages/QRGenerator";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
    </div>;
  }

  if (!user) {
    return <Navigate to="/" />;
  }

  return children;
};

const FacultyRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
    </div>;
  }

  if (!user || user.role !== "FACULTY") {
    return <Navigate to="/" />;
  }

  return <FacultyProvider>{children}</FacultyProvider>;
};

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/faculty-login" element={<FacultyLoginPage />} />
          <Route path="/student-login" element={<StudentLoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          
          <Route path="/faculty-dashboard" element={
            <FacultyRoute>
              <FacultyDashboard />
            </FacultyRoute>
          } />
          
          <Route path="/qr-generator/:classId" element={
            <FacultyRoute>
              <QRGenerator />
            </FacultyRoute>
          } />
          
          <Route path="/student-dashboard" element={
            <ProtectedRoute>
              <StudentDashboard />
            </ProtectedRoute>
          } />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
