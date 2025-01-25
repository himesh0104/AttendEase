import React from "react";

const AttendanceCard = ({ title, percentage }) => {
  return (
    <div className="flex justify-between items-center bg-[#111418] p-4 rounded-lg border border-[#293038]">
      <p className="text-white font-bold">{title}</p>
      <p className="text-white">{percentage}%</p>
    </div>
  );
};

export default AttendanceCard;
