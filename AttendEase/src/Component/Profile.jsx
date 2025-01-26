import React from 'react';

const Profile = () => {
  return (
    <div className="flex flex-col items-center mt-10">
      <h2 className="text-2xl font-bold mb-6">Your Profile</h2>
      <div className="border p-6 rounded shadow-md w-96">
        <p>Name: John Doe</p>
        <p>Email: john.doe@example.com</p>
        <p>Attendance: 85%</p>
      </div>
    </div>
  );
};

export default Profile;
