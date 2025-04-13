import React, { useState } from 'react';
import { useFaculty } from '@/contexts/FacultyContext';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FileSpreadsheet, Search } from 'lucide-react';

const AttendanceTab = () => {
  const { attendanceRecords, attendanceLoading, attendanceFilters, setAttendanceFilters, fetchAttendanceRecords } = useFaculty();
  const [dateFilter, setDateFilter] = useState(attendanceFilters.date || "");
  const [classFilter, setClassFilter] = useState(attendanceFilters.class || "");
  const [studentFilter, setStudentFilter] = useState(attendanceFilters.student || "");

  const handleFilterChange = () => {
    const filters = {
      date: dateFilter,
      class: classFilter,
      student: studentFilter
    };
    setAttendanceFilters(filters);
    fetchAttendanceRecords(filters);
  };

  const handleExport = async (format) => {
    try {
      // In a real application, this would call an API endpoint to generate and download the file
      alert(`Exporting attendance records as ${format}...`);
    } catch (error) {
      console.error(`Error exporting as ${format}:`, error);
    }
  };

  if (attendanceLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
      </div>
    );
  }

  return (
    <Card className="bg-white/5 backdrop-blur-lg border-white/10">
      <CardHeader>
        <CardTitle className="text-white">Attendance Records</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[200px]">
              <label className="text-purple-200 text-sm mb-1 block">Filter by Date</label>
              <Input 
                type="date" 
                className="bg-white/10 border-white/20 text-white" 
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
              />
            </div>
            <div className="flex-1 min-w-[200px]">
              <label className="text-purple-200 text-sm mb-1 block">Filter by Class</label>
              <Input 
                type="text" 
                className="bg-white/10 border-white/20 text-white" 
                placeholder="Class code" 
                value={classFilter}
                onChange={(e) => setClassFilter(e.target.value)}
              />
            </div>
            <div className="flex-1 min-w-[200px]">
              <label className="text-purple-200 text-sm mb-1 block">Filter by Student</label>
              <div className="flex gap-2">
                <Input 
                  type="text" 
                  className="bg-white/10 border-white/20 text-white" 
                  placeholder="Student name/ID" 
                  value={studentFilter}
                  onChange={(e) => setStudentFilter(e.target.value)}
                />
                <Button
                  variant="secondary"
                  className="bg-purple-900/50 hover:bg-purple-800/50"
                  onClick={handleFilterChange}
                >
                  <Search className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
          
          <div className="flex justify-end gap-2">
            <Button 
              variant="secondary"
              className="bg-purple-900/50 hover:bg-purple-800/50"
              onClick={() => handleExport('excel')}
            >
              <FileSpreadsheet className="mr-2 h-4 w-4" />
              Export Excel
            </Button>
            <Button 
              variant="secondary"
              className="bg-purple-900/50 hover:bg-purple-800/50"
              onClick={() => handleExport('pdf')}
            >
              <FileSpreadsheet className="mr-2 h-4 w-4" />
              Export PDF
            </Button>
          </div>
          
          <div className="rounded-md border border-white/10 overflow-hidden">
            <Table>
              <TableHeader className="bg-white/10">
                <TableRow>
                  <TableHead className="text-purple-100">Date</TableHead>
                  <TableHead className="text-purple-100">Class</TableHead>
                  <TableHead className="text-purple-100">Student ID</TableHead>
                  <TableHead className="text-purple-100">Student Name</TableHead>
                  <TableHead className="text-purple-100">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {attendanceRecords.length > 0 ? (
                  attendanceRecords.map((record) => (
                    <TableRow key={record.id} className="hover:bg-white/5">
                      <TableCell className="text-purple-100">{record.date}</TableCell>
                      <TableCell className="text-purple-100">{record.class} - {record.className}</TableCell>
                      <TableCell className="text-purple-100">{record.studentId}</TableCell>
                      <TableCell className="text-purple-100">{record.studentName}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          record.status === "Present" 
                            ? "bg-green-500/20 text-green-300" 
                            : "bg-red-500/20 text-red-300"
                        }`}>
                          {record.status}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center text-purple-300">
                      No records found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AttendanceTab; 