import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import StudentDashboard from "./StudentDashboard";
import FacultyDashboard from "./FacultyDashboard";

const Dashboard = () => {
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserRole = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/");
        return;
      }

      try {
        const response = await fetch("http://localhost:5000/api/auth/me", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();
        if (!data.success) {
          throw new Error(data.msg);
        }

        setUserRole(data.user.role);
      } catch (error) {
        console.error("Error fetching user role:", error);
        localStorage.removeItem("token");
        navigate("/");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserRole();
  }, [navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-purple-800 to-blue-900">
        <div className="text-white text-2xl">Loading...</div>
      </div>
    );
  }

  // Render the appropriate dashboard based on user role
  return userRole === "STUDENT" ? (
    <StudentDashboard />
  ) : userRole === "FACULTY" ? (
    <FacultyDashboard />
  ) : (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-purple-800 to-blue-900">
      <div className="text-white text-2xl">Unauthorized Access</div>
    </div>
  );
};

export default Dashboard;