import React from "react";
import AttendanceCard from "./AttendanceCard";

const Profile = () => {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Profile</h2>
      <AttendanceCard title="Overall Attendance" percentage={93} />
      <AttendanceCard title="Math" percentage={95} />
      <AttendanceCard title="Science" percentage={88} />
    </div>
  );
};

export default Profile;
