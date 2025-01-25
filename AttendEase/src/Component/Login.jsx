import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "./Button";

const Login = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center gap-6 py-10">
      <h2 className="text-2xl font-bold">Login</h2>
      <input type="text" placeholder="User ID" className="px-4 py-2 rounded bg-[#243647] text-white" />
      <input type="password" placeholder="Password" className="px-4 py-2 rounded bg-[#243647] text-white" />
      <Button label="Login" onClick={() => navigate("/profile")} />
      <Button label="Forgot Password?" onClick={() => navigate("/forgot-password")} variant="secondary" />
    </div>
  );
};

export default Login;
