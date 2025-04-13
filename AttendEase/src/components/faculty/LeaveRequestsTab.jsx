import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Calendar, Send, Trash2, Edit, Check, X } from 'lucide-react';
import { useFaculty } from '@/contexts/FacultyContext';

const LeaveRequestsTab = () => {
  const { leaveRequests, loading, createLeaveRequest, deleteLeaveRequest, updateLeaveRequest } = useFaculty();
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [newLeaveRequest, setNewLeaveRequest] = useState({
    startDate: '',
    endDate: '',
    reason: '',
    type: 'personal',
    status: 'pending'
  });

  const handleCreateLeaveRequest = async () => {
    try {
      await createLeaveRequest(newLeaveRequest);
      setShowCreateDialog(false);
      setNewLeaveRequest({
        startDate: '',
        endDate: '',
        reason: '',
        type: 'personal',
        status: 'pending'
      });
    } catch (error) {
      console.error('Error creating leave request:', error);
    }
  };

  const handleDeleteLeaveRequest = async (id) => {
    try {
      await deleteLeaveRequest(id);
    } catch (error) {
      console.error('Error deleting leave request:', error);
    }
  };

  const handleUpdateStatus = async (id, status) => {
    try {
      await updateLeaveRequest(id, { status });
    } catch (error) {
      console.error('Error updating leave request:', error);
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
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-white">Leave Requests</CardTitle>
        <Button 
          onClick={() => setShowCreateDialog(true)}
          className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
        >
          <Calendar className="mr-2 h-4 w-4" />
          New Leave Request
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="rounded-md border border-white/10 overflow-hidden">
            <Table>
              <TableHeader className="bg-white/10">
                <TableRow>
                  <TableHead className="text-purple-100">Start Date</TableHead>
                  <TableHead className="text-purple-100">End Date</TableHead>
                  <TableHead className="text-purple-100">Type</TableHead>
                  <TableHead className="text-purple-100">Reason</TableHead>
                  <TableHead className="text-purple-100">Status</TableHead>
                  <TableHead className="text-purple-100">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {leaveRequests?.map((request) => (
                  <TableRow key={request.id} className="hover:bg-white/5">
                    <TableCell className="text-purple-100">
                      {new Date(request.startDate).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-purple-100">
                      {new Date(request.endDate).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-purple-100 capitalize">
                      {request.type}
                    </TableCell>
                    <TableCell className="text-purple-100">
                      {request.reason}
                    </TableCell>
                    <TableCell>
                      <Badge className={`${
                        request.status === 'approved' 
                          ? "bg-green-900/50 text-green-200" 
                          : request.status === 'rejected'
                          ? "bg-red-900/50 text-red-200"
                          : "bg-amber-900/50 text-amber-200"
                      }`}>
                        {request.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        {request.status === 'pending' && (
                          <>
                            <Button 
                              size="sm" 
                              variant="ghost"
                              className="text-green-400 hover:text-green-300 hover:bg-green-500/10"
                              onClick={() => handleUpdateStatus(request.id, 'approved')}
                            >
                              <Check className="h-4 w-4" />
                            </Button>
                            <Button 
                              size="sm" 
                              variant="ghost"
                              className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                              onClick={() => handleUpdateStatus(request.id, 'rejected')}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </>
                        )}
                        <Button 
                          size="sm" 
                          variant="ghost"
                          className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                          onClick={() => handleDeleteLeaveRequest(request.id)}
                        >
                          <Trash2 className="h-4 w-4" />
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

      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogContent className="bg-purple-900/90 backdrop-blur-lg border-white/10">
          <DialogHeader>
            <DialogTitle className="text-white">Create New Leave Request</DialogTitle>
            <DialogDescription className="text-purple-200">
              Submit a leave request for approval
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="space-y-4">
              <div>
                <label className="text-purple-200 text-sm mb-1 block">Start Date</label>
                <Input 
                  type="date"
                  className="bg-white/10 border-white/20 text-white" 
                  value={newLeaveRequest.startDate}
                  onChange={(e) => setNewLeaveRequest({...newLeaveRequest, startDate: e.target.value})}
                />
              </div>
              <div>
                <label className="text-purple-200 text-sm mb-1 block">End Date</label>
                <Input 
                  type="date"
                  className="bg-white/10 border-white/20 text-white" 
                  value={newLeaveRequest.endDate}
                  onChange={(e) => setNewLeaveRequest({...newLeaveRequest, endDate: e.target.value})}
                />
              </div>
              <div>
                <label className="text-purple-200 text-sm mb-1 block">Type</label>
                <Select 
                  value={newLeaveRequest.type} 
                  onValueChange={(value) => setNewLeaveRequest({...newLeaveRequest, type: value})}
                >
                  <SelectTrigger className="bg-white/10 border-white/20 text-white">
                    <SelectValue placeholder="Select Type" />
                  </SelectTrigger>
                  <SelectContent className="bg-purple-900/90 backdrop-blur-lg border-white/10">
                    <SelectItem value="personal" className="text-white hover:bg-white/10">Personal</SelectItem>
                    <SelectItem value="sick" className="text-white hover:bg-white/10">Sick</SelectItem>
                    <SelectItem value="vacation" className="text-white hover:bg-white/10">Vacation</SelectItem>
                    <SelectItem value="other" className="text-white hover:bg-white/10">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-purple-200 text-sm mb-1 block">Reason</label>
                <Textarea 
                  className="bg-white/10 border-white/20 text-white h-32 resize-none" 
                  value={newLeaveRequest.reason}
                  onChange={(e) => setNewLeaveRequest({...newLeaveRequest, reason: e.target.value})}
                  placeholder="Enter your reason for leave..."
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button 
              onClick={handleCreateLeaveRequest}
              className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white"
            >
              <Send className="mr-2 h-4 w-4" />
              Submit Request
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default LeaveRequestsTab; 