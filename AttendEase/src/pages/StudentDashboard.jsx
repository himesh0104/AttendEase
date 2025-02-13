import React, { useState } from 'react';
import { Camera, Calendar, Award, Clock, RotateCcw, Bell, CheckCircle, Trophy, Target, Star, Zap, Sparkles } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

function StudentDashboard() {
  const [scanning, setScanning] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Mock data remains the same as your original
  const studentData = {
    name: "John Doe",
    attendanceRate: 85,
    points: 450,
    level: 5,
    nextLevelPoints: 500,
    streak: 15,
    badges: [
      { id: 1, name: "Perfect Week", icon: Trophy, color: "#FFD700" },
      { id: 2, name: "Early Bird", icon: Clock, color: "#87CEEB" },
      { id: 3, name: "Consistent Learner", icon: Target, color: "#98FB98" },
      { id: 4, name: "15 Day Streak", icon: Zap, color: "#FFA500" }
    ],
    achievements: [
      { name: "100% Monthly Attendance", progress: 85, required: 100 },
      { name: "30 Day Streak", progress: 15, required: 30 },
      { name: "Early Arrival Champion", progress: 8, required: 10 }
    ],
    schedule: [
      { id: 1, subject: "Mathematics", time: "09:00 AM", room: "301" },
      { id: 2, subject: "Physics", time: "11:00 AM", room: "205" },
      { id: 3, subject: "Computer Science", time: "02:00 PM", room: "Lab 2" }
    ],
    scanHistory: [
      { id: 1, subject: "Mathematics", timestamp: "2024-02-10 09:05 AM", status: "Present" },
      { id: 2, subject: "Physics", timestamp: "2024-02-10 11:02 AM", status: "Present" }
    ],
    subjectWiseAttendance: [
      { subject: "Mathematics", present: 22, total: 25, rate: 88 },
      { subject: "Physics", present: 20, total: 24, rate: 83 },
      { subject: "Computer Science", present: 21, total: 23, rate: 91 }
    ],
    monthlyTrend: [
      { month: 'Jan', rate: 92 },
      { month: 'Feb', rate: 88 },
      { month: 'Mar', rate: 85 }
    ]
  };

  function toggleScanner() {
    setScanning(!scanning);
    if (scanning) {
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }
  }

  function LevelProgressBar() {
    return (
      <div className="w-full bg-purple-900/30 rounded-full h-4 mt-2">
        <div 
          className="bg-gradient-to-r from-purple-500 to-blue-500 h-4 rounded-full transition-all"
          style={{ width: `${(studentData.points / studentData.nextLevelPoints) * 100}%` }}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-blue-900 text-white p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Success Message */}
        {showSuccess && (
          <Alert className="bg-green-500/20 border-green-500/50 text-green-300">
            <CheckCircle className="h-4 w-4" />
            <AlertDescription>
              Attendance marked successfully!
            </AlertDescription>
          </Alert>
        )}

        {/* Level & Progress Section */}
        <Card className="bg-white/5 backdrop-blur-lg border-white/10">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="text-2xl font-bold flex items-center gap-2">
                  <Sparkles className="text-purple-300" />
                  Welcome, {studentData.name}
                </div>
                <div className="text-purple-200">Level {studentData.level} | {studentData.points} XP</div>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-yellow-300 flex items-center gap-2">
                  <Zap />
                  <span className="text-xl font-bold">{studentData.streak} Day Streak!</span>
                </div>
              </div>
            </div>
            <LevelProgressBar />
          </CardContent>
        </Card>

        {/* QR Scanner Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-white/5 backdrop-blur-lg border-white/10">
            <CardContent className="pt-6">
              <div className="text-center">
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
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="bg-white/5 backdrop-blur-lg border-white/10">
            <CardContent className="pt-6">
              <button className="w-full p-4 bg-purple-900/30 rounded-lg hover:bg-purple-800/30 flex items-center gap-3 mb-4 transition-colors">
                <RotateCcw className="text-purple-300" />
                <div className="text-left">
                  <div className="font-medium">Request Regularization</div>
                  <div className="text-sm text-purple-200">Submit absence explanation</div>
                </div>
              </button>
            </CardContent>
          </Card>

          <Card className="bg-white/5 backdrop-blur-lg border-white/10">
            <CardContent className="pt-6">
              <button className="w-full p-4 bg-purple-900/30 rounded-lg hover:bg-purple-800/30 flex items-center gap-3 transition-colors">
                <Calendar className="text-purple-300" />
                <div className="text-left">
                  <div className="font-medium">Sync Calendar</div>
                  <div className="text-sm text-purple-200">Connect with Google Calendar</div>
                </div>
              </button>
            </CardContent>
          </Card>
        </div>

        {/* Achievements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {studentData.achievements.map((achievement, index) => (
            <Card key={index} className="bg-white/5 backdrop-blur-lg border-white/10">
              <CardContent className="pt-6">
                <div className="flex justify-between items-center mb-2">
                  <div className="font-medium">{achievement.name}</div>
                  <div className="text-purple-300">{achievement.progress}/{achievement.required}</div>
                </div>
                <div className="w-full bg-purple-900/30 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full transition-all"
                    style={{ width: `${(achievement.progress / achievement.required) * 100}%` }}
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Analytics Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Subject-wise Attendance */}
          <Card className="bg-white/5 backdrop-blur-lg border-white/10">
            <CardHeader>
              <CardTitle className="text-purple-100">Subject-wise Attendance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={studentData.subjectWiseAttendance}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#4B3F8A" />
                    <XAxis dataKey="subject" stroke="#B794F4" />
                    <YAxis stroke="#B794F4" />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#1a1333', border: '1px solid #4B3F8A' }}
                      labelStyle={{ color: '#B794F4' }}
                    />
                    <Bar dataKey="rate" fill="url(#barGradient)" />
                    <defs>
                      <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#8B5CF6" />
                        <stop offset="100%" stopColor="#3B82F6" />
                      </linearGradient>
                    </defs>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Monthly Trend */}
          <Card className="bg-white/5 backdrop-blur-lg border-white/10">
            <CardHeader>
              <CardTitle className="text-purple-100">Monthly Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={studentData.monthlyTrend}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#4B3F8A" />
                    <XAxis dataKey="month" stroke="#B794F4" />
                    <YAxis stroke="#B794F4" />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#1a1333', border: '1px solid #4B3F8A' }}
                      labelStyle={{ color: '#B794F4' }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="rate" 
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
        </div>

        {/* Badges & Recent Scans */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Badges */}
          <Card className="bg-white/5 backdrop-blur-lg border-white/10">
            <CardHeader>
              <CardTitle className="text-purple-100">Earned Badges</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                {studentData.badges.map((badge) => {
                  const IconComponent = badge.icon;
                  return (
                    <div key={badge.id} className="flex items-center p-4 bg-purple-900/30 rounded-lg">
                      <IconComponent size={32} style={{ color: badge.color }} />
                      <div className="ml-3">{badge.name}</div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Recent Scans */}
          <Card className="bg-white/5 backdrop-blur-lg border-white/10">
            <CardHeader>
              <CardTitle className="text-purple-100">Recent Scans</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {studentData.scanHistory.map(scan => (
                  <div key={scan.id} className="flex justify-between items-center p-3 bg-purple-900/30 rounded-lg">
                    <div>
                      <div className="font-medium">{scan.subject}</div>
                      <div className="text-sm text-purple-200">{scan.timestamp}</div>
                    </div>
                    <div className="px-3 py-1 rounded-full bg-green-500/20 text-green-300">
                      {scan.status}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default StudentDashboard;