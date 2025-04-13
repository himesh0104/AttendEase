import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  QrCode, Plus, LogOut, Copy, Download, Clock, Calendar, 
  Filter, FileSpreadsheet, Trash2, Edit, CheckSquare, 
  XSquare, FilePlus, Users, CalendarRange, Maximize, Search,
  Mail, Send, Bell, CalendarX, CheckCircle, XCircle, AlertTriangle,
  PieChart as PieChartIcon, BarChart as BarChartIcon, UserX, AlertCircle
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useFaculty } from "@/contexts/FacultyContext";
import ClassesTab from "@/components/faculty/ClassesTab";
import AttendanceTab from "@/components/faculty/AttendanceTab";
import AnalyticsTab from "@/components/faculty/AnalyticsTab";
import DefaultersTab from "@/components/faculty/DefaultersTab";
import AnnouncementsTab from "@/components/faculty/AnnouncementsTab";
import LeaveRequestsTab from "@/components/faculty/LeaveRequestsTab";

const FacultyDashboard = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { loading } = useFaculty();
  const [activeTab, setActiveTab] = useState("classes");

  useEffect(() => {
    if (!user) {
      navigate("/");
    } else if (user.role !== "FACULTY") {
      alert("Unauthorized Access");
      navigate("/");
    }
  }, [user, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">Faculty Dashboard</h1>
            <p className="text-purple-200">Welcome, {user?.name}</p>
          </div>
          <Button
            variant="outline"
            className="bg-white/10 text-white hover:bg-white/20"
            onClick={logout}
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="bg-white/10 p-1">
            <TabsTrigger value="classes" className="text-white data-[state=active]:bg-white/20">
              <Users className="w-4 h-4 mr-2" />
              Classes
            </TabsTrigger>
            <TabsTrigger value="attendance" className="text-white data-[state=active]:bg-white/20">
              <CheckSquare className="w-4 h-4 mr-2" />
              Attendance
            </TabsTrigger>
            <TabsTrigger value="analytics" className="text-white data-[state=active]:bg-white/20">
              <PieChartIcon className="w-4 h-4 mr-2" />
              Analytics
            </TabsTrigger>
            <TabsTrigger value="defaulters" className="text-white data-[state=active]:bg-white/20">
              <UserX className="w-4 h-4 mr-2" />
              Defaulters
            </TabsTrigger>
            <TabsTrigger value="announcements" className="text-white data-[state=active]:bg-white/20">
              <Bell className="w-4 h-4 mr-2" />
              Announcements
            </TabsTrigger>
            <TabsTrigger value="leave-requests" className="text-white data-[state=active]:bg-white/20">
              <CalendarX className="w-4 h-4 mr-2" />
              Leave Requests
            </TabsTrigger>
          </TabsList>

          <TabsContent value="classes">
            <ClassesTab />
          </TabsContent>

          <TabsContent value="attendance">
            <AttendanceTab />
          </TabsContent>

          <TabsContent value="analytics">
            <AnalyticsTab />
          </TabsContent>

          <TabsContent value="defaulters">
            <DefaultersTab />
          </TabsContent>

          <TabsContent value="announcements">
            <AnnouncementsTab />
          </TabsContent>

          <TabsContent value="leave-requests">
            <LeaveRequestsTab />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default FacultyDashboard;