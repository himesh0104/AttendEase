import React from "react";
import Button from "./Button";

const Signup = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-6 py-10">
      <h2 className="text-2xl font-bold">Sign Up</h2>
      <input type="text" placeholder="Full Name" className="px-4 py-2 rounded bg-[#243647] text-white" />
      <input type="email" placeholder="Email" className="px-4 py-2 rounded bg-[#243647] text-white" />
      <input type="password" placeholder="Password" className="px-4 py-2 rounded bg-[#243647] text-white" />
      <Button label="Sign Up" />
    </div>
  );
};

export default Signup;
