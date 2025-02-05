import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#0d0f18] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-white">Welcome to AttendEase</h1>
        </div>

        <div className="flex flex-col gap-3 w-full max-w-sm mx-auto">
          <Link to="/student-login">
            <button className="w-full bg-[#2563eb] hover:bg-[#1e4fd6] text-white py-4 rounded-md text-lg">
              Student Login
            </button>
          </Link>
          <Link to="/faculty-login">
            <button className="w-full bg-[#1f2937] hover:bg-[#374151] text-white py-4 rounded-md text-lg">
              Faculty Login
            </button>
          </Link>
        </div>

        <div className="text-center space-y-2 mt-6">
          <Link to="/signup" className="text-blue-400 hover:text-blue-300 block">
            Don't have an account? Sign up.
          </Link>
          <Link to="/forgot-password" className="text-blue-400 hover:text-blue-300 block">
            Forgot password?
          </Link>
        </div>

        <div className="fixed bottom-4 left-0 right-0 text-center text-gray-500 text-sm">
          © 2025 AttendEase. All rights reserved.
        </div>
      </div>
    </div>
  );
}
