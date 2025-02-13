import React, { useState } from 'react';
import { QrCode, Copy, Download, Clock, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const QRGenerator = () => {
  const [selectedClass, setSelectedClass] = useState(null);
  const [duration, setDuration] = useState(15);

  const classes = [
    { id: 1, name: "CSE101 - Introduction to Programming", time: "09:00 AM", room: "301" },
    { id: 2, name: "CSE102 - Data Structures", time: "11:00 AM", room: "302" },
    { id: 3, name: "CSE103 - Database Systems", time: "02:00 PM", room: "303" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-blue-900 text-white p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <Card className="bg-white/5 backdrop-blur-lg border-white/10">
          <CardHeader>
            <CardTitle className="text-purple-100">Generate Attendance QR Code</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="space-y-4">
                <label className="text-purple-200">Select Class</label>
                <div className="grid gap-4">
                  {classes.map((cls) => (
                    <button
                      key={cls.id}
                      className={`p-4 rounded-lg flex items-center justify-between ${
                        selectedClass?.id === cls.id 
                          ? 'bg-gradient-to-r from-purple-500 to-blue-500'
                          : 'bg-purple-900/30 hover:bg-purple-800/30'
                      } transition-colors`}
                      onClick={() => setSelectedClass(cls)}
                    >
                      <div className="flex items-center gap-3">
                        <Calendar className="text-purple-300" />
                        <div className="text-left">
                          <div className="font-medium">{cls.name}</div>
                          <div className="text-sm text-purple-200">{cls.time} | Room {cls.room}</div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <label className="text-purple-200">QR Code Duration</label>
                <div className="flex gap-4">
                  {[5, 10, 15, 30].map((mins) => (
                    <button
                      key={mins}
                      className={`p-3 rounded-lg flex items-center gap-2 ${
                        duration === mins
                          ? 'bg-gradient-to-r from-purple-500 to-blue-500'
                          : 'bg-purple-900/30 hover:bg-purple-800/30'
                      } transition-colors`}
                      onClick={() => setDuration(mins)}
                    >
                      <Clock className="h-4 w-4" />
                      {mins} mins
                    </button>
                  ))}
                </div>
              </div>

              
              {selectedClass && (
                <div className="mt-6 p-6 bg-purple-900/30 rounded-lg flex flex-col items-center">
                  <div className="w-64 h-64 bg-white p-4 rounded-lg mb-4">
                    <QrCode className="w-full h-full text-purple-900" />
                  </div>
                  <div className="space-y-2 text-center">
                    <div className="font-medium">{selectedClass.name}</div>
                    <div className="text-purple-200">Valid for {duration} minutes</div>
                  </div>
                  <div className="flex gap-4 mt-4">
                    <button className="bg-purple-900/50 hover:bg-purple-800/50 p-2 rounded-lg">
                      <Copy className="h-5 w-5" />
                    </button>
                    <button className="bg-purple-900/50 hover:bg-purple-800/50 p-2 rounded-lg">
                      <Download className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default QRGenerator;
