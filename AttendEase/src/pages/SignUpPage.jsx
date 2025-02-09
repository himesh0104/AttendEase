import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ArrowLeft, User, Mail, KeyRound, Eye, EyeOff, Loader2 } from "lucide-react";

export default function SignupPage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
    department: "",
  });
  const [errors, setErrors] = useState({});

  const departments = [
    "Computer Science",
    "Information Technology",
    "Electronics",
    "Mechanical",
    "Civil",
    "Electrical",
  ];

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }
    
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    
    if (!formData.role) {
      newErrors.role = "Please select a role";
    }
    
    if (!formData.department) {
      newErrors.department = "Please select a department";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      navigate('/login');
    } catch (error) {
      console.error('Signup error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 flex items-center justify-center p-6 relative">
      {/* Background animation */}
      <div className="absolute inset-0 overflow-hidden">
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

      <div className="w-full max-w-xl space-y-8">
        <div className="bg-white/10 p-8 rounded-2xl backdrop-blur-sm space-y-6">
          <div className="flex flex-col space-y-6">
            <button
              onClick={() => navigate(-1)}
              className="text-white/80 hover:text-white transition-colors duration-200 flex items-center gap-2 group w-fit"
            >
              <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform duration-200" />
              <span>Back</span>
            </button>

            <div className="text-center space-y-2">
              <h1 className="text-3xl font-bold text-white">Create Account</h1>
              <p className="text-purple-200/80">
                Join AttendEase to get started
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Full Name */}
            <div className="relative group">
              <Input
                type="text"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                className="w-full pl-12 pr-4 py-3 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-purple-400 focus:ring-purple-400 transition-all duration-200"
              />
              <User className="absolute left-4 top-3.5 h-5 w-5 text-white/50 group-focus-within:text-purple-400 transition-colors duration-200" />
              {errors.fullName && (
                <p className="text-red-400 text-sm mt-1">{errors.fullName}</p>
              )}
            </div>

            {/* Email */}
            <div className="relative group">
              <Input
                type="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full pl-12 pr-4 py-3 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-purple-400 focus:ring-purple-400 transition-all duration-200"
              />
              <Mail className="absolute left-4 top-3.5 h-5 w-5 text-white/50 group-focus-within:text-purple-400 transition-colors duration-200" />
              {errors.email && (
                <p className="text-red-400 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div className="relative group">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full pl-12 pr-12 py-3 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-purple-400 focus:ring-purple-400 transition-all duration-200"
              />
              <KeyRound className="absolute left-4 top-3.5 h-5 w-5 text-white/50 group-focus-within:text-purple-400 transition-colors duration-200" />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-3.5 text-white/50 hover:text-white/80 transition-colors duration-200"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
              {errors.password && (
                <p className="text-red-400 text-sm mt-1">{errors.password}</p>
              )}
            </div>

            {/* Confirm Password */}
            <div className="relative group">
              <Input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                className="w-full pl-12 pr-12 py-3 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-purple-400 focus:ring-purple-400 transition-all duration-200"
              />
              <KeyRound className="absolute left-4 top-3.5 h-5 w-5 text-white/50 group-focus-within:text-purple-400 transition-colors duration-200" />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-3.5 text-white/50 hover:text-white/80 transition-colors duration-200"
              >
                {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
              {errors.confirmPassword && (
                <p className="text-red-400 text-sm mt-1">{errors.confirmPassword}</p>
              )}
            </div>

            {/* Role Selection */}
            <div className="space-y-2">
              <label className="text-white text-sm">Select Role</label>
              <RadioGroup
                value={formData.role}
                onValueChange={(value) => setFormData({ ...formData, role: value })}
                className="flex gap-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="student" id="student" className="border-white/20 text-purple-400" />
                  <label htmlFor="student" className="text-white">Student</label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="faculty" id="faculty" className="border-white/20 text-purple-400" />
                  <label htmlFor="faculty" className="text-white">Faculty</label>
                </div>
              </RadioGroup>
              {errors.role && (
                <p className="text-red-400 text-sm">{errors.role}</p>
              )}
            </div>

            {/* Department Selection */}
            <div className="space-y-2">
              <label className="text-white text-sm">Department</label>
              <Select
                value={formData.department}
                onValueChange={(value) => setFormData({ ...formData, department: value })}
              >
                <SelectTrigger className="w-full bg-white/10 border-white/20 text-white">
                  <SelectValue placeholder="Select Department" />
                </SelectTrigger>
                <SelectContent>
                  {departments.map((dept) => (
                    <SelectItem key={dept} value={dept.toLowerCase()}>
                      {dept}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.department && (
                <p className="text-red-400 text-sm">{errors.department}</p>
              )}
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-400 hover:to-blue-400 text-white py-6 rounded-lg font-medium transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <Loader2 className="h-5 w-5 animate-spin mx-auto" />
              ) : (
                'Create Account'
              )}
            </Button>
          </form>
        </div>

        {/* Footer */}
        <div className="text-center">
          <Link
            to="/login"
            className="text-purple-200 hover:text-white transition-colors duration-200 inline-flex items-center gap-1 group"
          >
            Already have an account?{" "}
            <span className="font-semibold group-hover:translate-x-0.5 transition-transform duration-200">
              Sign in
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}