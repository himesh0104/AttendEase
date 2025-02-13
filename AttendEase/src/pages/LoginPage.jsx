import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, User, KeyRound, Loader2, Eye, EyeOff } from "lucide-react";

const LoginPage = ({ userType = "Student" }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    id: "",
    password: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      // Navigate based on userType
      if (userType.toLowerCase() === "student") {
        navigate("/student-dashboard");
      } else if (userType.toLowerCase() === "teacher") {
        navigate("/teacher-dashboard");
      } else if (userType.toLowerCase() === "admin") {
        navigate("/admin-dashboard");
      }
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 flex items-center justify-center p-6">
      {/* Animated background dots */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 opacity-20">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-white w-2 h-2 animate-pulse"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
              }}
            />
          ))}
        </div>
      </div>

      <div className="w-full max-w-md space-y-8 relative">
        {/* Main content card */}
        <div className="bg-white/10 p-8 rounded-2xl backdrop-blur-sm border border-white/10 shadow-xl space-y-6">
          <div className="flex flex-col space-y-6">
            <button
              onClick={() => navigate("/")}
              className="text-white/80 hover:text-white transition-colors duration-200 flex items-center gap-2 group w-fit"
            >
              <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform duration-200" />
              <span>Back to Home</span>
            </button>

            <div className="text-center space-y-2">
              <h1 className="text-3xl font-bold text-white">
                {userType} Login
              </h1>
              <p className="text-purple-200/80">
                Welcome back! Please enter your details
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="relative group">
                <Input
                  type="text"
                  placeholder={`${userType} ID`}
                  value={formData.id}
                  onChange={(e) => setFormData({ ...formData, id: e.target.value })}
                  className="w-full pl-12 pr-4 py-3 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-purple-400 focus:ring-purple-400 transition-all duration-200"
                  required
                />
                <User className="absolute left-4 top-3.5 h-5 w-5 text-white/50 group-focus-within:text-purple-400 transition-colors duration-200" />
              </div>

              <div className="relative group">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full pl-12 pr-12 py-3 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-purple-400 focus:ring-purple-400 transition-all duration-200"
                  required
                />
                <KeyRound className="absolute left-4 top-3.5 h-5 w-5 text-white/50 group-focus-within:text-purple-400 transition-colors duration-200" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-3.5 text-white/50 hover:text-white/80 transition-colors duration-200"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <Link 
                to="/forgot-password"
                className="text-sm text-purple-200 hover:text-white transition-colors duration-200"
              >
                Forgot password?
              </Link>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-400 hover:to-blue-400 text-white py-6 rounded-lg font-medium transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <Loader2 className="h-5 w-5 animate-spin mx-auto" />
              ) : (
                'Sign In'
              )}
            </Button>
          </form>
        </div>

        {/* Sign up link */}
        <div className="text-center">
          <p className="text-white/80">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-purple-200 hover:text-white transition-colors duration-200 font-semibold"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;