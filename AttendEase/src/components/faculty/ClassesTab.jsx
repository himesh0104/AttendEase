import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { QrCode, Plus, Calendar, Copy, Download, Clock, Maximize, Edit, Trash2 } from 'lucide-react';
import { useFaculty } from '@/contexts/FacultyContext';

const ClassesTab = () => {
  const { classes, loading, createClass, updateClass, deleteClass, generateQRCode } = useFaculty();
  const [showQRGenerator, setShowQRGenerator] = useState(false);
  const [selectedClass, setSelectedClass] = useState(null);
  const [duration, setDuration] = useState(15);
  const [qrCodeData, setQrCodeData] = useState(null);
  const [newClassData, setNewClassData] = useState({
    name: "",
    code: "",
    schedule: "",
    room: ""
  });

  const handleGenerateQR = async (cls) => {
    try {
      setSelectedClass(cls);
      setShowQRGenerator(true);
      setQrCodeData(null); // Reset QR code while generating
      const response = await generateQRCode(cls.id, duration);
      console.log('QR Code Response:', response);
      setQrCodeData(response);
    } catch (error) {
      console.error('Error generating QR code:', error);
      alert('Failed to generate QR code. Please try again.');
    }
  };

  const handleCreateClass = async () => {
    try {
      if (!newClassData.name || !newClassData.code || !newClassData.schedule || !newClassData.room) {
        alert('Please fill in all fields');
        return;
      }
      await createClass(newClassData);
      setNewClassData({ name: "", code: "", schedule: "", room: "" });
    } catch (error) {
      console.error('Error creating class:', error);
      alert(error.message || 'Failed to create class');
    }
  };

  const handleDeleteClass = async (id) => {
    try {
      await deleteClass(id);
    } catch (error) {
      console.error('Error deleting class:', error);
    }
  };

  const handleBackToClasses = () => {
    setSelectedClass(null);
    setShowQRGenerator(false);
    setQrCodeData(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {!showQRGenerator ? (
        <>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Create New Class */}
            <Card className="bg-white/5 backdrop-blur-lg border-white/10">
              <CardHeader>
                <CardTitle className="text-white">Create New Class</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <label className="text-purple-200 text-sm mb-1 block">Class Name</label>
                    <Input 
                      className="bg-white/10 border-white/20 text-white" 
                      placeholder="e.g. Introduction to Programming" 
                      value={newClassData.name}
                      onChange={(e) => setNewClassData({...newClassData, name: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="text-purple-200 text-sm mb-1 block">Class Code</label>
                    <Input 
                      className="bg-white/10 border-white/20 text-white" 
                      placeholder="e.g. CSE101" 
                      value={newClassData.code}
                      onChange={(e) => setNewClassData({...newClassData, code: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="text-purple-200 text-sm mb-1 block">Schedule Time</label>
                    <Input 
                      className="bg-white/10 border-white/20 text-white" 
                      placeholder="e.g. 09:00 AM" 
                      value={newClassData.schedule}
                      onChange={(e) => setNewClassData({...newClassData, schedule: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="text-purple-200 text-sm mb-1 block">Room</label>
                    <Input 
                      className="bg-white/10 border-white/20 text-white" 
                      placeholder="e.g. 301" 
                      value={newClassData.room}
                      onChange={(e) => setNewClassData({...newClassData, room: e.target.value})}
                    />
                  </div>
                  <Button
                    onClick={handleCreateClass}
                    className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Create Class
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Class List */}
            <Card className="bg-white/5 backdrop-blur-lg border-white/10">
              <CardHeader>
                <CardTitle className="text-white">Your Classes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {classes.length === 0 ? (
                    <p className="text-purple-300">No classes created yet</p>
                  ) : (
                    classes.map((cls) => (
                      <div 
                        key={cls.id} 
                        className="bg-white/10 p-4 rounded-lg hover:bg-white/20 transition-all"
                      >
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-3">
                            <Calendar className="text-purple-300" />
                            <div>
                              <h3 className="font-medium text-white">{cls.name}</h3>
                              <p className="text-sm text-purple-300">{cls.code} | Room {cls.room || "TBD"}</p>
                              <p className="text-sm text-purple-200">{cls.schedule || "Schedule TBD"}</p>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              size="icon"
                              variant="ghost"
                              className="hover:bg-white/10"
                              onClick={() => handleGenerateQR(cls)}
                            >
                              <QrCode className="h-4 w-4" />
                            </Button>
                            <Button
                              size="icon"
                              variant="ghost"
                              className="hover:bg-white/10"
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              size="icon"
                              variant="ghost"
                              className="hover:bg-red-500/20 text-red-400"
                              onClick={() => handleDeleteClass(cls.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </>
      ) : (
        <Card className="bg-white/5 backdrop-blur-lg border-white/10">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-white">Generate Attendance QR Code</CardTitle>
            <Button
              variant="ghost"
              className="text-purple-300 hover:text-white hover:bg-white/10"
              onClick={handleBackToClasses}
            >
              Back to Classes
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="p-4 rounded-lg bg-white/10">
                <div className="flex items-center gap-3">
                  <Calendar className="text-purple-300" />
                  <div>
                    <div className="font-medium text-white">{selectedClass?.name}</div>
                    <div className="text-sm text-purple-200">
                      {selectedClass?.schedule || "Schedule TBD"} | Room {selectedClass?.room || "TBD"}
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <label className="text-purple-200">QR Code Duration</label>
                <div className="flex flex-wrap gap-4">
                  {[5, 10, 15, 30].map((mins) => (
                    <Button
                      key={mins}
                      variant={duration === mins ? "default" : "secondary"}
                      className={`${
                        duration === mins
                          ? 'bg-gradient-to-r from-purple-500 to-blue-500'
                          : 'bg-purple-900/30 hover:bg-purple-800/30'
                      }`}
                      onClick={() => {
                        setDuration(mins);
                        if (selectedClass) {
                          handleGenerateQR(selectedClass);
                        }
                      }}
                    >
                      <Clock className="mr-2 h-4 w-4" />
                      {mins} mins
                    </Button>
                  ))}
                </div>
              </div>

              <div className="mt-6 p-6 bg-purple-900/30 rounded-lg flex flex-col items-center">
                {qrCodeData ? (
                  <>
                    <div className="w-64 h-64 bg-white p-4 rounded-lg mb-4">
                      <img src={qrCodeData.qrCodeUrl} alt="QR Code" className="w-full h-full" />
                    </div>
                    <div className="space-y-2 text-center">
                      <div className="font-medium text-white">{selectedClass?.name}</div>
                      <div className="text-purple-200">Valid for {duration} minutes</div>
                      <div className="text-sm text-purple-300">
                        Expires at: {new Date(qrCodeData.expiryTime).toLocaleString()}
                      </div>
                    </div>
                    <div className="flex gap-4 mt-4">
                      <Button
                        variant="secondary"
                        className="bg-purple-900/50 hover:bg-purple-800/50"
                        onClick={() => navigator.clipboard.writeText(qrCodeData.qrCodeUrl)}
                      >
                        <Copy className="mr-2 h-4 w-4" />
                        Copy
                      </Button>
                      <Button
                        variant="secondary"
                        className="bg-purple-900/50 hover:bg-purple-800/50"
                        onClick={() => {
                          const link = document.createElement('a');
                          link.href = qrCodeData.qrCodeUrl;
                          link.download = `qr-${selectedClass?.code}-${new Date().toISOString()}.png`;
                          link.click();
                        }}
                      >
                        <Download className="mr-2 h-4 w-4" />
                        Download
                      </Button>
                      <Button
                        variant="secondary"
                        className="bg-purple-900/50 hover:bg-purple-800/50"
                        onClick={() => window.open(qrCodeData.qrCodeUrl, '_blank')}
                      >
                        <Maximize className="mr-2 h-4 w-4" />
                        Full Size
                      </Button>
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col items-center justify-center p-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mb-4"></div>
                    <p className="text-purple-200">Generating QR Code...</p>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ClassesTab; 