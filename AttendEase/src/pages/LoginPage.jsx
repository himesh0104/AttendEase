import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, User, KeyRound, Loader2, Eye, EyeOff } from "lucide-react";

const LoginPage = ({ userType = "Student" }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email, password: formData.password }),
      });
      
      const data = await response.json();
      if (data.success) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.user.role);
        
        if (data.user.role.toLowerCase() === "student") {
          navigate("/student-dashboard");
        } else if (data.user.role.toLowerCase() === "faculty") {
          navigate("/faculty-dashboard");
        } else if (data.user.role.toLowerCase() === "admin") {
          navigate("/admin-dashboard");
        }
      } else {
        alert("Invalid email or password. Please try again!");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Something went wrong. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 flex items-center justify-center p-6">
      <div className="w-full max-w-md space-y-8 relative">
        <div className="bg-white/10 p-8 rounded-2xl backdrop-blur-sm border border-white/10 shadow-xl space-y-6">
          <button onClick={() => navigate("/")} className="text-white/80 hover:text-white transition-colors duration-200 flex items-center gap-2 group w-fit">
            <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform duration-200" />
            <span>Back to Home</span>
          </button>

          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold text-white">{userType} Login</h1>
            <p className="text-purple-200/80">Welcome back! Please enter your details</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-4">
              <div className="relative group">
                <Input type="email" placeholder="Email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full pl-12 pr-4 py-3 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-purple-400 focus:ring-purple-400 transition-all duration-200" required />
                <User className="absolute left-4 top-3.5 h-5 w-5 text-white/50 group-focus-within:text-purple-400 transition-colors duration-200" />
              </div>
              
              <div className="relative group">
                <Input type={showPassword ? "text" : "password"} placeholder="Password" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} className="w-full pl-12 pr-12 py-3 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-purple-400 focus:ring-purple-400 transition-all duration-200" required />
                <KeyRound className="absolute left-4 top-3.5 h-5 w-5 text-white/50 group-focus-within:text-purple-400 transition-colors duration-200" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-3.5 text-white/50 hover:text-white/80 transition-colors duration-200">
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <Link to="/forgot-password" className="text-sm text-purple-200 hover:text-white transition-colors duration-200">Forgot password?</Link>
            </div>

            <Button type="submit" disabled={isLoading} className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-400 hover:to-blue-400 text-white py-6 rounded-lg font-medium transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed">
              {isLoading ? <Loader2 className="h-5 w-5 animate-spin mx-auto" /> : "Sign In"}
            </Button>
          </form>
        </div>

        <div className="text-center">
          <p className="text-white/80">Don't have an account? <Link to="/signup" className="text-purple-200 hover:text-white transition-colors duration-200 font-semibold">Sign up</Link></p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
