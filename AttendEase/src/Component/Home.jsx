import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "./Button";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center gap-6 py-10">
      <h2 className="text-2xl font-bold">Welcome to AttendEase</h2>
      <Button label="Student Login" onClick={() => navigate("/login")} />
      <Button label="Faculty Login" onClick={() => navigate("/login")} variant="secondary" />
    </div>
  );
};

export default Home;