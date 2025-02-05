import { Link } from "react-router-dom";
import { Button } from "@/components/button";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4">
      <div className="w-full max-w-sm space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight text-white">AttendEase</h1>
          <p className="text-xl text-white">Sign in to your account</p>
        </div>
        <div className="space-y-4">
          <Link to="/student-login">
            <Button className="w-full mb-3">Student</Button>
          </Link>
          <Link to="/faculty-login">
            <Button variant="outline" className="w-full">Faculty</Button>
          </Link>
        </div>
        <div className="space-y-2 text-center">
          <p className="text-sm text-gray-400">
            Don't have an account?{" "}
            <Link to="/signup" className="text-gray-400 hover:text-gray-300">
              Sign up
            </Link>
          </p>
          <Link to="/forgot-password" className="text-sm text-gray-400 hover:text-gray-300">
            Forgot password?
          </Link>
        </div>
      </div>
    </div>
  );
}
