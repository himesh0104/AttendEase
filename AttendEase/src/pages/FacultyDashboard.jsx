import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { QrCode, Plus, LogOut } from "lucide-react";

const FacultyDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
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

        setUser(data.user);

        if (data.user.role !== "FACULTY") {
          alert("Unauthorized Access");
          navigate("/");
        }

        // Fetch faculty's classes
        const classesResponse = await fetch("http://localhost:5000/api/classes", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        const classesData = await classesResponse.json();
        setClasses(classesData);
      } catch (error) {
        console.error("Error fetching user or classes:", error);
        localStorage.removeItem("token");
        navigate("/");
      }
    };

    fetchUser();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-blue-900 text-white p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <Card className="bg-white/5 backdrop-blur-lg border-white/10 flex-1">
            <CardContent className="pt-6">
              <h1 className="text-2xl font-bold">Welcome, {user?.name || "Faculty"}</h1>
              <p className="text-purple-200">Role: {user?.role || "Unknown"}</p>
            </CardContent>
          </Card>
          
          <button
            className="ml-4 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white px-4 py-3 rounded-lg flex items-center justify-center gap-2"
            onClick={handleLogout}
          >
            <LogOut size={20} />
            Logout
          </button>
        </div>

        <Card className="bg-white/5 backdrop-blur-lg border-white/10">
          <CardContent className="pt-6">
            <h2 className="text-xl font-semibold mb-4">Your Classes</h2>
            {classes.length === 0 ? (
              <p className="text-purple-300">No classes assigned</p>
            ) : (
              <div className="grid md:grid-cols-2 gap-4">
                {classes.map((cls) => (
                  <div 
                    key={cls.id} 
                    className="bg-white/10 p-4 rounded-lg hover:bg-white/20 transition-all"
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-medium">{cls.name}</h3>
                        <p className="text-sm text-purple-300">{cls.code}</p>
                      </div>
                      <button 
                        onClick={() => navigate(`/qr-generator/${cls.id}`)}
                        className="bg-blue-500 hover:bg-blue-600 p-2 rounded-full"
                      >
                        <QrCode size={20} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="bg-white/5 backdrop-blur-lg border-white/10">
          <CardContent className="pt-6 text-center">
            <button
              onClick={() => navigate("/create-class")}
              className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white px-6 py-3 rounded-lg flex items-center justify-center gap-2"
            >
              <Plus size={24} />
              Create New Class
            </button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FacultyDashboard;