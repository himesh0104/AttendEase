import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle, Camera, LogOut } from "lucide-react";
import QRScanner from "@/components/ui/QRScanner";

const StudentDashboard = () => {
  const navigate = useNavigate();
  const [scanning, setScanning] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [user, setUser] = useState(null);
  const [attendanceMessage, setAttendanceMessage] = useState("");

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

        if (data.user.role !== "STUDENT") {
          alert("Unauthorized Access");
          navigate("/");
        }
      } catch (error) {
        console.error("Error fetching user:", error);
        localStorage.removeItem("token");
        navigate("/");
      }
    };

    fetchUser();
  }, [navigate]);

  const toggleScanner = () => {
    setScanning(!scanning);
    if (scanning) {
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }
  };

  const handleAttendance = async (sessionToken) => {
    try {
      const response = await fetch("/api/attendance/mark-attendance", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({ 
          sessionToken, 
          studentId: user?.id 
        }),
      });
      const data = await response.json();
      setAttendanceMessage(data.message);
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        setAttendanceMessage("");
      }, 3000);
    } catch (error) {
      setAttendanceMessage("❌ Attendance marking failed.");
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        setAttendanceMessage("");
      }, 3000);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-blue-900 text-white p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {(showSuccess || attendanceMessage) && (
          <Alert className="bg-green-500/20 border-green-500/50 text-green-300">
            <CheckCircle className="h-4 w-4" />
            <AlertDescription>
              {attendanceMessage || "Attendance marked successfully!"}
            </AlertDescription>
          </Alert>
        )}

        <div className="flex justify-between items-center">
          <Card className="bg-white/5 backdrop-blur-lg border-white/10 flex-1">
            <CardContent className="pt-6">
              <h1 className="text-2xl font-bold">Welcome, {user?.name || "Student"}</h1>
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
          <CardContent className="pt-6 text-center">
            {scanning ? (
              <QRScanner 
                studentId={user?.id} 
                onScan={handleAttendance}
              />
            ) : (
              <button
                className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white px-6 py-3 rounded-lg flex items-center justify-center gap-2"
                onClick={toggleScanner}
              >
                <Camera size={24} />
                Scan QR Code
              </button>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StudentDashboard;