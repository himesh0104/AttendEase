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
import {
  ArrowLeft,
  User,
  Mail,
  KeyRound,
  Eye,
  EyeOff,
  Loader2,
  GraduationCap,
  Users,
  Building2,
} from "lucide-react";

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
    { id: "cs", name: "Computer Science", icon: "💻" },
    { id: "it", name: "Information Technology", icon: "🌐" },
    { id: "ec", name: "Electronics", icon: "⚡" },
    { id: "me", name: "Mechanical", icon: "⚙️" },
    { id: "ce", name: "Civil", icon: "🏗️" },
    { id: "ee", name: "Electrical", icon: "🔌" },
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
      const response = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.fullName,
          email: formData.email,
          password: formData.password,
          role: formData.role.toUpperCase(),
          department: formData.department
        }),
      });

      const data = await response.json();
      if (data.success) {
        localStorage.setItem("user", JSON.stringify({
          name: formData.fullName,
          role: formData.role.toUpperCase(),
          department: formData.department
        }));
        localStorage.setItem("token", data.token);
        navigate(formData.role === "faculty" ? "/faculty-dashboard" : "/student-dashboard");
      } else {
        alert(data.msg);
      }
    } catch (error) {
      console.error("Signup error:", error);
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
                onChange={(e) =>
                  setFormData({ ...formData, fullName: e.target.value })
                }
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
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
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
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className="w-full pl-12 pr-12 py-3 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-purple-400 focus:ring-purple-400 transition-all duration-200"
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
                onChange={(e) =>
                  setFormData({ ...formData, confirmPassword: e.target.value })
                }
                className="w-full pl-12 pr-12 py-3 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-purple-400 focus:ring-purple-400 transition-all duration-200"
              />
              <KeyRound className="absolute left-4 top-3.5 h-5 w-5 text-white/50 group-focus-within:text-purple-400 transition-colors duration-200" />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-3.5 text-white/50 hover:text-white/80 transition-colors duration-200"
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
              {errors.confirmPassword && (
                <p className="text-red-400 text-sm mt-1">
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            <div className="space-y-4">
              <label className="text-white text-sm">Select Role</label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, role: "student" })}
                  className={`relative p-4 rounded-xl border-2 transition-all duration-300 group
            ${
              formData.role === "student"
                ? "border-purple-400 bg-purple-400/20"
                : "border-white/20 hover:border-purple-400/50 bg-white/5"
            }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-2 rounded-lg transition-colors duration-300
              ${
                formData.role === "student"
                  ? "bg-purple-400/20"
                  : "bg-white/10 group-hover:bg-purple-400/10"
              }`}
                    >
                      <GraduationCap
                        className={`h-6 w-6 transition-colors duration-300
                ${
                  formData.role === "student"
                    ? "text-purple-400"
                    : "text-white/50 group-hover:text-purple-400/80"
                }`}
                      />
                    </div>
                    <div className="text-left">
                      <p
                        className={`font-medium transition-colors duration-300
                ${
                  formData.role === "student"
                    ? "text-purple-400"
                    : "text-white group-hover:text-purple-400/80"
                }`}
                      >
                        Student
                      </p>
                      <p className="text-sm text-white/50">Join as a student</p>
                    </div>
                  </div>
                  <div
                    className={`absolute -top-2 -right-2 p-1.5 rounded-full transition-all duration-300
            ${
              formData.role === "student" ? "bg-purple-400" : "bg-transparent"
            }`}
                  >
                    <div
                      className={`w-3 h-3 rounded-full transition-all duration-300
              ${formData.role === "student" ? "bg-white" : ""}`}
                    />
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, role: "faculty" })}
                  className={`relative p-4 rounded-xl border-2 transition-all duration-300 group
            ${
              formData.role === "faculty"
                ? "border-purple-400 bg-purple-400/20"
                : "border-white/20 hover:border-purple-400/50 bg-white/5"
            }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-2 rounded-lg transition-colors duration-300
              ${
                formData.role === "faculty"
                  ? "bg-purple-400/20"
                  : "bg-white/10 group-hover:bg-purple-400/10"
              }`}
                    >
                      <Users
                        className={`h-6 w-6 transition-colors duration-300
                ${
                  formData.role === "faculty"
                    ? "text-purple-400"
                    : "text-white/50 group-hover:text-purple-400/80"
                }`}
                      />
                    </div>
                    <div className="text-left">
                      <p
                        className={`font-medium transition-colors duration-300
                ${
                  formData.role === "faculty"
                    ? "text-purple-400"
                    : "text-white group-hover:text-purple-400/80"
                }`}
                      >
                        Faculty
                      </p>
                      <p className="text-sm text-white/50">Join as faculty</p>
                    </div>
                  </div>
                  <div
                    className={`absolute -top-2 -right-2 p-1.5 rounded-full transition-all duration-300
            ${
              formData.role === "faculty" ? "bg-purple-400" : "bg-transparent"
            }`}
                  >
                    <div
                      className={`w-3 h-3 rounded-full transition-all duration-300
              ${formData.role === "faculty" ? "bg-white" : ""}`}
                    />
                  </div>
                </button>
              </div>
              {errors.role && (
                <p className="text-red-400 text-sm">{errors.role}</p>
              )}
            </div>

            {/* Department Selection - Enhanced Version */}
            <div className="space-y-4">
              <label className="text-white text-sm">Department</label>
              <Select
                value={formData.department}
                onValueChange={(value) =>
                  setFormData({ ...formData, department: value })
                }
              >
                <SelectTrigger className="w-full bg-white/10 border-white/20 text-white h-14 px-4 hover:bg-white/20 transition-colors duration-200">
                  <div className="flex items-center gap-3">
                    <Building2 className="h-5 w-5 text-white/50" />
                    <SelectValue placeholder="Select your department" />
                  </div>
                </SelectTrigger>
                <SelectContent className="bg-slate-900 border-white/20">
                  <div className="grid grid-cols-1 gap-1 p-1">
                    {departments.map((dept) => (
                      <SelectItem
                        key={dept.id}
                        value={dept.id}
                        className="hover:bg-white/10 focus:bg-white/20 rounded-lg transition-colors duration-200"
                      >
                        <div className="flex items-center gap-3 py-1">
                          <span className="text-xl">{dept.icon}</span>
                          <div className="flex flex-col">
                            <span className="font-medium">{dept.name}</span>
                            <span className="text-sm text-white/50">
                              {dept.id.toUpperCase()} Department
                            </span>
                          </div>
                        </div>
                      </SelectItem>
                    ))}
                  </div>
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
                "Create Account"
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