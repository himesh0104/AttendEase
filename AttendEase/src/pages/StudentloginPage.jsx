import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/button";
import { Input } from "@/components/input";
import { ArrowLeft, User, KeyRound } from "lucide-react";

export default function StudentLoginPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4">
      <div className="w-full max-w-sm space-y-6">
        <div className="space-y-4">
          <button onClick={() => navigate(-1)} className="text-gray-400 hover:text-gray-300">
            <ArrowLeft className="h-6 w-6" />
          </button>
          <h1 className="text-2xl font-semibold tracking-tight text-white">Student Login</h1>
        </div>
        <form className="space-y-4">
          <div className="relative">
            <Input type="text" placeholder="Student ID" className="w-full pl-10" />
            <User className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
          <div className="relative">
            <Input type="password" placeholder="Password" className="w-full pl-10" />
            <KeyRound className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
          <Link to="/forgot-password" className="text-sm text-gray-400 hover:text-gray-300">
            Forgot password?
          </Link>
          <Button className="w-full">Login</Button>
        </form>
        <div className="text-center">
          <Link to="/signup" className="text-sm text-gray-400 hover:text-gray-300">
            New user? Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}
