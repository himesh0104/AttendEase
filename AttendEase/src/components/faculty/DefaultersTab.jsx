import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Mail } from 'lucide-react';
import { useFaculty } from '@/contexts/FacultyContext';

const DefaultersTab = () => {
  const { defaulters, loading, classes, notifyDefaulters } = useFaculty();
  const [selectedClass, setSelectedClass] = useState('all');
  const [threshold, setThreshold] = useState('75');
  const [notificationTemplate, setNotificationTemplate] = useState('warning');
  const [notificationMessage, setNotificationMessage] = useState(
    "Dear Student, This is to inform you that your attendance has fallen below the minimum required threshold of 75%. Please ensure regular attendance in upcoming classes to avoid academic penalties. Contact your faculty advisor if you need any assistance."
  );

  const handleNotifyAll = async () => {
    try {
      const defaulterIds = defaulters
        .filter(d => d.status === "Not Notified")
        .map(d => d.id);
      await notifyDefaulters(defaulterIds, notificationMessage);
    } catch (error) {
      console.error('Error notifying defaulters:', error);
    }
  };

  const handleNotifyOne = async (studentId) => {
    try {
      await notifyDefaulters([studentId], notificationMessage);
    } catch (error) {
      console.error('Error notifying student:', error);
    }
  };

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
        <CardTitle className="text-white">Defaulters List (Below 75% Attendance)</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="flex flex-wrap justify-between items-center gap-4">
            <div className="flex gap-4">
              <Select value={selectedClass} onValueChange={setSelectedClass}>
                <SelectTrigger className="bg-white/10 border-white/20 text-white w-40">
                  <SelectValue placeholder="Select Class" />
                </SelectTrigger>
                <SelectContent className="bg-purple-900 border-white/20">
                  <SelectItem value="all">All Classes</SelectItem>
                  {classes.map((cls) => (
                    <SelectItem key={cls.id} value={cls.id.toString()}>
                      {cls.code}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select value={threshold} onValueChange={setThreshold}>
                <SelectTrigger className="bg-white/10 border-white/20 text-white w-40">
                  <SelectValue placeholder="Threshold" />
                </SelectTrigger>
                <SelectContent className="bg-purple-900 border-white/20">
                  <SelectItem value="75">Below 75%</SelectItem>
                  <SelectItem value="70">Below 70%</SelectItem>
                  <SelectItem value="65">Below 65%</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600">
                  <Mail className="mr-2 h-4 w-4" />
                  Notify All Defaulters
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-purple-900/90 backdrop-blur-lg border-white/10">
                <DialogHeader>
                  <DialogTitle className="text-white">Notify Defaulters</DialogTitle>
                  <DialogDescription className="text-purple-200">
                    Send attendance warning notifications to all students with attendance below threshold.
                  </DialogDescription>
                </DialogHeader>
                <div className="py-4">
                  <div className="space-y-4">
                    <div>
                      <label className="text-purple-200 text-sm mb-1 block">Notification Template</label>
                      <Select value={notificationTemplate} onValueChange={setNotificationTemplate}>
                        <SelectTrigger className="bg-white/10 border-white/20 text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-purple-900 border-white/20">
                          <SelectItem value="warning">Attendance Warning</SelectItem>
                          <SelectItem value="reminder">Friendly Reminder</SelectItem>
                          <SelectItem value="critical">Critical Notice</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="text-purple-200 text-sm mb-1 block">Message</label>
                      <Textarea 
                        className="bg-white/10 border-white/20 text-white h-32" 
                        value={notificationMessage}
                        onChange={(e) => setNotificationMessage(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button 
                    onClick={handleNotifyAll}
                    className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
                  >
                    <Mail className="mr-2 h-4 w-4" />
                    Send Notifications
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          
          <div className="rounded-md border border-white/10 overflow-hidden">
            <Table>
              <TableHeader className="bg-white/10">
                <TableRow>
                  <TableHead className="text-purple-100">Student ID</TableHead>
                  <TableHead className="text-purple-100">Name</TableHead>
                  <TableHead className="text-purple-100">Email</TableHead>
                  <TableHead className="text-purple-100">Attendance %</TableHead>
                  <TableHead className="text-purple-100">Status</TableHead>
                  <TableHead className="text-purple-100">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {defaulters.map((student) => (
                  <TableRow key={student.id} className="hover:bg-white/5">
                    <TableCell className="text-purple-100">{student.id}</TableCell>
                    <TableCell className="text-purple-100">{student.name}</TableCell>
                    <TableCell className="text-purple-100">{student.email}</TableCell>
                    <TableCell>
                      <Badge className={`${
                        student.attendance < 65 
                          ? "bg-red-900/50 text-red-200" 
                          : "bg-amber-900/50 text-amber-200"
                      }`}>
                        {student.attendance}%
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={`${
                        student.status === "Notified" 
                          ? "bg-green-900/50 text-green-200" 
                          : "bg-purple-900/50 text-purple-200"
                      }`}>
                        {student.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          disabled={student.status === "Notified"}
                          className="bg-blue-700/50 hover:bg-blue-600/50"
                          onClick={() => handleNotifyOne(student.id)}
                        >
                          <Mail className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DefaultersTab; 