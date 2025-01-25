import React from "react";
import AttendanceCard from "./AttendanceCard";

const AttendanceOverview = () => {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Attendance Overview</h2>
      <AttendanceCard title="SE" percentage={85} />
      <AttendanceCard title="DSA" percentage={90} />
    </div>
  );
};

export default AttendanceOverview;
