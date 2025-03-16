import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle, Camera } from "lucide-react";

const Dashboard = ({ userRole }) => {
  const navigate = useNavigate();
  const [scanning, setScanning] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (!token || !storedUser) {
      navigate("/login"); // Redirect if not logged in
      return;
    }

    try {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);

      if (parsedUser?.role !== userRole) {
        alert("Unauthorized Access");
        navigate("/login");
      }
    } catch (error) {
      console.error("Error parsing user data:", error);
      localStorage.removeItem("user"); // Clear invalid data
      navigate("/login");
    }
  }, [navigate, userRole]);

  const toggleScanner = () => {
    setScanning(!scanning);
    if (scanning) {
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-blue-900 text-white p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {showSuccess && (
          <Alert className="bg-green-500/20 border-green-500/50 text-green-300">
            <CheckCircle className="h-4 w-4" />
            <AlertDescription>Attendance marked successfully!</AlertDescription>
          </Alert>
        )}

        <Card className="bg-white/5 backdrop-blur-lg border-white/10">
          <CardContent className="pt-6">
            <h1 className="text-2xl font-bold">
              Welcome, {user?.name ? user.name : "Guest"}
            </h1>
            <p className="text-purple-200">Role: {user?.role || "Unknown"}</p>
          </CardContent>
        </Card>

        {userRole === "STUDENT" ? (
          <Card className="bg-white/5 backdrop-blur-lg border-white/10">
            <CardContent className="pt-6 text-center">
              {scanning ? (
                <div className="w-full aspect-square bg-purple-900/30 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <Camera size={48} className="mx-auto mb-2 text-purple-300" />
                    <button
                      className="bg-red-500/80 hover:bg-red-600/80 text-white px-4 py-2 rounded"
                      onClick={toggleScanner}
                    >
                      Stop Scanning
                    </button>
                  </div>
                </div>
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
        ) : (
          <Card className="bg-white/5 backdrop-blur-lg border-white/10">
            <CardContent className="pt-6">
              <button
                onClick={() => navigate("/qr-generator")}
                className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 px-4 py-2 rounded-lg flex items-center gap-2"
              >
                Generate QR Code
              </button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
