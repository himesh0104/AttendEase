import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { 
  QrCode, 
  BarChart3, 
  Bell, 
  Edit3, 
  Upload, 
  Mail, 
  BookOpen, 
  Shield, 
  Link2, 
  Users,
  FileSpreadsheet,
  AlertTriangle,
  CheckCircle,
  Download
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const FacultyDashboard = () => {
  const [selectedCourse, setSelectedCourse] = useState('CSE101');
  const [showSuccess, setShowSuccess] = useState(false);
  const navigate = useNavigate();

   const goToQRPage = () => {
    navigate("/qr-generator");
  };

  // Mock data
  const courseData = {
    name: "Introduction to Computer Science",
    code: "CSE101",
    section: "A",
    totalStudents: 45,
    averageAttendance: 85,
    lastUpdated: "2024-02-13 10:30 AM",
    attendanceData: [
      { date: '01/02', present: 42, absent: 3 },
      { date: '02/02', present: 40, absent: 5 },
      { date: '03/02', present: 43, absent: 2 },
      { date: '04/02', present: 41, absent: 4 },
      { date: '05/02', present: 44, absent: 1 }
    ],
    lowAttendanceStudents: [
      { id: "ST101", name: "Alice Johnson", attendance: 65, lastPresent: "2024-02-10" },
      { id: "ST102", name: "Bob Smith", attendance: 70, lastPresent: "2024-02-12" }
    ],
    recentActivity: [
      { type: "Proxy Detected", student: "Charlie Brown", time: "10:15 AM" },
      { type: "Manual Override", student: "Diana Prince", time: "09:30 AM" },
      { type: "Bulk Upload", count: 45, time: "09:00 AM" }
    ]
  };

  const generateQRCode = () => {
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-blue-900 text-white p-6">
  <div className="max-w-7xl mx-auto space-y-6">
    {showSuccess && (
      <Alert className="bg-green-500/20 border-green-500/50 text-green-300">
        <CheckCircle className="h-4 w-4" />
        <AlertDescription>
          QR Code generated successfully!
        </AlertDescription>
      </Alert>
    )}

    {/* Header Section */}
    <Card className="bg-white/5 backdrop-blur-lg border-white/10">
      <CardContent className="pt-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">{courseData.name}</h1>
            <p className="text-purple-200">
              {courseData.code} | Section {courseData.section} | {courseData.totalStudents} Students
            </p>
          </div>
          <div className="flex gap-4">
            {/* ✅ Updated "Generate QR Code" Button */}
            <button
              onClick={goToQRPage}
              className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 px-4 py-2 rounded-lg flex items-center gap-2"
            >
              <QrCode className="h-5 w-5" />
              Generate QR Code
            </button>
          </div>
        </div>
      </CardContent>
    </Card>

        {/* Quick Actions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { icon: Upload, title: "Bulk Upload", desc: "Import via Excel" },
            { icon: Edit3, title: "Manual Override", desc: "Update attendance" },
            { icon: Mail, title: "Send Notifications", desc: "Email/SMS updates" },
            { icon: Shield, title: "Fraud Detection", desc: "View alerts" }
          ].map((action, idx) => (
            <Card key={idx} className="bg-white/5 backdrop-blur-lg border-white/10">
              <CardContent className="pt-6">
                <button className="w-full p-4 bg-purple-900/30 rounded-lg hover:bg-purple-800/30 transition-colors">
                  <action.icon className="h-8 w-8 mb-2 text-purple-300 mx-auto" />
                  <div className="font-medium">{action.title}</div>
                  <div className="text-sm text-purple-200">{action.desc}</div>
                </button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Analytics Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-white/5 backdrop-blur-lg border-white/10">
            <CardHeader>
              <CardTitle className="text-purple-100">Attendance Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={courseData.attendanceData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#4B3F8A" />
                    <XAxis dataKey="date" stroke="#B794F4" />
                    <YAxis stroke="#B794F4" />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#1a1333', border: '1px solid #4B3F8A' }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="present" 
                      stroke="url(#lineGradient)" 
                      strokeWidth={2}
                    />
                    <defs>
                      <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#8B5CF6" />
                        <stop offset="100%" stopColor="#3B82F6" />
                      </linearGradient>
                    </defs>
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Low Attendance Students */}
          <Card className="bg-white/5 backdrop-blur-lg border-white/10">
            <CardHeader>
              <CardTitle className="text-purple-100">Low Attendance Alerts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {courseData.lowAttendanceStudents.map((student, idx) => (
                  <div key={idx} className="p-4 bg-purple-900/30 rounded-lg flex justify-between items-center">
                    <div>
                      <div className="font-medium">{student.name}</div>
                      <div className="text-sm text-purple-200">Last Present: {student.lastPresent}</div>
                    </div>
                    <div className="text-red-300">{student.attendance}%</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card className="bg-white/5 backdrop-blur-lg border-white/10">
          <CardHeader>
            <CardTitle className="text-purple-100">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {courseData.recentActivity.map((activity, idx) => (
                <div key={idx} className="p-4 bg-purple-900/30 rounded-lg flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    {activity.type === "Proxy Detected" ? (
                      <AlertTriangle className="text-yellow-300" />
                    ) : activity.type === "Manual Override" ? (
                      <Edit3 className="text-purple-300" />
                    ) : (
                      <FileSpreadsheet className="text-green-300" />
                    )}
                    <div>
                      <div className="font-medium">{activity.type}</div>
                      <div className="text-sm text-purple-200">
                        {activity.student ? `Student: ${activity.student}` : `Records: ${activity.count}`}
                      </div>
                    </div>
                  </div>
                  <div className="text-purple-200">{activity.time}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FacultyDashboard;