import React from 'react';

const AttendanceOverview = () => {
  const subjects = [
    { name: 'Math', attendance: 90 },
    { name: 'Science', attendance: 85 },
    { name: 'History', attendance: 80 },
  ];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Attendance Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {subjects.map((subject) => (
          <div key={subject.name} className="border rounded p-4">
            <h3 className="text-lg font-bold">{subject.name}</h3>
            <p>Attendance: {subject.attendance}%</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AttendanceOverview;
