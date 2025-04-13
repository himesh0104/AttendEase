import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Bell, Send, Trash2, Edit } from 'lucide-react';
import { useFaculty } from '@/contexts/FacultyContext';

const AnnouncementsTab = () => {
  const { announcements, loading, classes, createAnnouncement, deleteAnnouncement } = useFaculty();
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [newAnnouncement, setNewAnnouncement] = useState({
    title: '',
    message: '',
    classId: '',
    priority: 'normal'
  });

  const handleCreateAnnouncement = async () => {
    try {
      await createAnnouncement(newAnnouncement);
      setShowCreateDialog(false);
      setNewAnnouncement({
        title: '',
        message: '',
        classId: '',
        priority: 'normal'
      });
    } catch (error) {
      console.error('Error creating announcement:', error);
    }
  };

  const handleDeleteAnnouncement = async (id) => {
    try {
      await deleteAnnouncement(id);
    } catch (error) {
      console.error('Error deleting announcement:', error);
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
        <CardTitle className="text-white">Announcements</CardTitle>
        <Button 
          onClick={() => setShowCreateDialog(true)}
          className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
        >
          <Bell className="mr-2 h-4 w-4" />
          New Announcement
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="rounded-md border border-white/10 overflow-hidden">
            <Table>
              <TableHeader className="bg-white/10">
                <TableRow>
                  <TableHead className="text-purple-100">Title</TableHead>
                  <TableHead className="text-purple-100">Class</TableHead>
                  <TableHead className="text-purple-100">Priority</TableHead>
                  <TableHead className="text-purple-100">Date</TableHead>
                  <TableHead className="text-purple-100">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {announcements.map((announcement) => (
                  <TableRow key={announcement.id} className="hover:bg-white/5">
                    <TableCell className="text-purple-100">{announcement.title}</TableCell>
                    <TableCell className="text-purple-100">
                      {classes.find(c => c.id === announcement.classId)?.code || 'All Classes'}
                    </TableCell>
                    <TableCell>
                      <Badge className={`${
                        announcement.priority === 'high' 
                          ? "bg-red-900/50 text-red-200" 
                          : announcement.priority === 'medium'
                          ? "bg-amber-900/50 text-amber-200"
                          : "bg-blue-900/50 text-blue-200"
                      }`}>
                        {announcement.priority}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-purple-100">
                      {new Date(announcement.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          variant="ghost"
                          className="text-purple-300 hover:text-white hover:bg-white/10"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="ghost"
                          className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                          onClick={() => handleDeleteAnnouncement(announcement.id)}
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
            <DialogTitle className="text-white">Create New Announcement</DialogTitle>
            <DialogDescription className="text-purple-200">
              Send an announcement to your students
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="space-y-4">
              <div>
                <label className="text-purple-200 text-sm mb-1 block">Title</label>
                <Input 
                  className="bg-white/10 border-white/20 text-white" 
                  value={newAnnouncement.title}
                  onChange={(e) => setNewAnnouncement({...newAnnouncement, title: e.target.value})}
                />
              </div>
              <div>
                <label className="text-purple-200 text-sm mb-1 block">Class</label>
                <Select 
                  value={newAnnouncement.classId} 
                  onValueChange={(value) => setNewAnnouncement({...newAnnouncement, classId: value})}
                >
                  <SelectTrigger className="bg-white/10 border-white/20 text-white">
                    <SelectValue placeholder="Select Class" />
                  </SelectTrigger>
                  <SelectContent className="bg-purple-900 border-white/20">
                    <SelectItem value="">All Classes</SelectItem>
                    {classes.map((cls) => (
                      <SelectItem key={cls.id} value={cls.id.toString()}>
                        {cls.code}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-purple-200 text-sm mb-1 block">Priority</label>
                <Select 
                  value={newAnnouncement.priority} 
                  onValueChange={(value) => setNewAnnouncement({...newAnnouncement, priority: value})}
                >
                  <SelectTrigger className="bg-white/10 border-white/20 text-white">
                    <SelectValue placeholder="Select Priority" />
                  </SelectTrigger>
                  <SelectContent className="bg-purple-900 border-white/20">
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="normal">Normal</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-purple-200 text-sm mb-1 block">Message</label>
                <Textarea 
                  className="bg-white/10 border-white/20 text-white h-32" 
                  value={newAnnouncement.message}
                  onChange={(e) => setNewAnnouncement({...newAnnouncement, message: e.target.value})}
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button 
              onClick={handleCreateAnnouncement}
              className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
            >
              <Send className="mr-2 h-4 w-4" />
              Send Announcement
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default AnnouncementsTab; 