import React from "react";
import Button from "./Button";

const ForgotPassword = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-6 py-10">
      <h2 className="text-2xl font-bold">Forgot Password</h2>
      <input type="email" placeholder="Email Address" className="px-4 py-2 rounded bg-[#243647] text-white" />
      <Button label="Get OTP" />
    </div>
  );
};

export default ForgotPassword;
