import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { BarChart as BarChartIcon, AlertTriangle, CheckCircle, PieChart as PieChartIcon } from 'lucide-react';
import { useFaculty } from '@/contexts/FacultyContext';

const AnalyticsTab = () => {
  const { analytics, loading } = useFaculty();

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
      </div>
    );
  }

  return (
    <Card className="bg-white/5 backdrop-blur-lg border-white/10">
      <CardHeader>
        <CardTitle className="text-white">Attendance Analytics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-6">
          {/* Average Attendance Per Class */}
          <Card className="bg-white/10 border-white/10">
            <CardHeader>
              <CardTitle className="text-lg flex items-center text-white">
                <BarChartIcon className="mr-2 h-5 w-5 text-purple-300" />
                Average Attendance Per Class
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={analytics.averageAttendance}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                    <XAxis dataKey="name" stroke="#ccc" />
                    <YAxis stroke="#ccc" />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#1e1e2e', borderColor: '#6b46c1' }} 
                      labelStyle={{ color: '#ccc' }}
                    />
                    <Legend />
                    <Bar dataKey="attendance" name="Attendance %" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          {/* Top Defaulters */}
          <Card className="bg-white/10 border-white/10">
            <CardHeader>
              <CardTitle className="text-lg flex items-center text-white">
                <AlertTriangle className="mr-2 h-5 w-5 text-amber-300" />
                Top Defaulters
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80 overflow-auto">
                <Table>
                  <TableHeader className="bg-white/10">
                    <TableRow>
                      <TableHead className="text-purple-100">Student ID</TableHead>
                      <TableHead className="text-purple-100">Name</TableHead>
                      <TableHead className="text-purple-100">Attendance %</TableHead>
                      <TableHead className="text-purple-100">Missed Classes</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {analytics.topDefaulters.map((student, index) => (
                      <TableRow key={index} className="hover:bg-white/5">
                        <TableCell className="text-purple-100">{student.id}</TableCell>
                        <TableCell className="text-purple-100">{student.name}</TableCell>
                        <TableCell>
                          <span className="text-red-300">{student.attendance}%</span>
                        </TableCell>
                        <TableCell className="text-purple-100">{student.missedClasses}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
          
          {/* Most Active Students */}
          <Card className="bg-white/10 border-white/10">
            <CardHeader>
              <CardTitle className="text-lg flex items-center text-white">
                <CheckCircle className="mr-2 h-5 w-5 text-green-300" />
                Most Active Students
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80 overflow-auto">
                <Table>
                  <TableHeader className="bg-white/10">
                    <TableRow>
                      <TableHead className="text-purple-100">Student ID</TableHead>
                      <TableHead className="text-purple-100">Name</TableHead>
                      <TableHead className="text-purple-100">Attendance %</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {analytics.activeStudents.map((student, index) => (
                      <TableRow key={index} className="hover:bg-white/5">
                        <TableCell className="text-purple-100">{student.id}</TableCell>
                        <TableCell className="text-purple-100">{student.name}</TableCell>
                        <TableCell>
                          <span className="text-green-300">{student.attendance}%</span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
          
          {/* Attendance Distribution */}
          <Card className="bg-white/10 border-white/10">
            <CardHeader>
              <CardTitle className="text-lg flex items-center text-white">
                <PieChartIcon className="mr-2 h-5 w-5 text-blue-300" />
                Overall Attendance Distribution
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80 flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={[
                        { name: "Above 90%", value: 30 },
                        { name: "75-90%", value: 45 },
                        { name: "Below 75%", value: 25 }
                      ]}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      fill="#8884d8"
                      paddingAngle={5}
                      dataKey="value"
                      label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      <Cell fill="#4ade80" />
                      <Cell fill="#60a5fa" />
                      <Cell fill="#f87171" />
                    </Pie>
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#1e1e2e', borderColor: '#6b46c1' }} 
                      labelStyle={{ color: '#ccc' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
};

export default AnalyticsTab; 