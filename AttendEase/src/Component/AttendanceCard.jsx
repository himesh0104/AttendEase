import React from 'react';

const AttendanceCard = ({ subject, attendance }) => {
  return (
    <div className="border rounded-lg p-4 shadow-md bg-white">
      <h3 className="text-lg font-semibold">{subject}</h3>
      <p className="text-sm">Attendance: {attendance}%</p>
    </div>
  );
};

export default AttendanceCard;
