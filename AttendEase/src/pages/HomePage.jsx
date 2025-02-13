import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { GraduationCap, Users, ArrowRight, Sparkles } from 'lucide-react';

export default function HomePage() {
  const [hoveredButton, setHoveredButton] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 flex items-center justify-center p-6 relative overflow-hidden">
      {/* Animated background dots */}
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

      <div className="w-full max-w-lg relative">
        {/* Logo and Title Section with enhanced animation */}
        <div className="text-center mb-16 space-y-6">
          <div className="flex justify-center mb-8 relative">
            <div className="bg-white/10 p-5 rounded-full rotate-3 transition-transform hover:rotate-6 duration-300">
              <div className="bg-gradient-to-r from-purple-500 to-blue-500 p-4 rounded-full transform hover:scale-110 transition-transform duration-300">
                <Sparkles className="w-10 h-10 text-white animate-pulse" />
              </div>
            </div>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent">
            Welcome to AttendEase
          </h1>
          <p className="text-lg text-purple-200/90 animate-fade-in">
            Your Smart Attendance Solution
          </p>
        </div>
        
        {/* Login Options with enhanced animations */}
        <div className="flex flex-col gap-6 w-full max-w-md mx-auto mb-12">
          <Link 
            to="/student-login" 
            className="group transform hover:scale-105 transition-all duration-300"
            onMouseEnter={() => setHoveredButton('student')}
            onMouseLeave={() => setHoveredButton(null)}
          >
            <button className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-400 hover:to-blue-400 text-white p-5 rounded-2xl text-lg flex items-center justify-between shadow-lg hover:shadow-purple-500/25">
              <div className="flex items-center gap-4">
                <div className="bg-white/20 p-2 rounded-lg">
                  <GraduationCap className={`w-6 h-6 ${hoveredButton === 'student' ? 'animate-bounce' : ''}`} />
                </div>
                <span className="font-semibold">Student Portal</span>
              </div>
              <ArrowRight className="w-5 h-5 transform group-hover:translate-x-2 transition-transform duration-500" />
            </button>
          </Link>
          
          <Link 
            to="/faculty-login" 
            className="group transform hover:scale-105 transition-all duration-300"
            onMouseEnter={() => setHoveredButton('faculty')}
            onMouseLeave={() => setHoveredButton(null)}
          >
            <button className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white p-5 rounded-2xl text-lg flex items-center justify-between shadow-lg hover:shadow-indigo-500/25">
              <div className="flex items-center gap-4">
                <div className="bg-white/20 p-2 rounded-lg">
                  <Users className={`w-6 h-6 ${hoveredButton === 'faculty' ? 'animate-bounce' : ''}`} />
                </div>
                <span className="font-semibold">Faculty Portal</span>
              </div>
              <ArrowRight className="w-5 h-5 transform group-hover:translate-x-2 transition-transform duration-500" />
            </button>
          </Link>
        </div>

        {/* Links Section with hover effects */}
        <div className="text-center space-y-4 mb-16">
          <Link to="/signup" className="group block">
            <span className="text-purple-200 group-hover:text-white transition-colors duration-300">
              New to AttendEase? {" "}
              <span className="inline-flex items-center gap-1 font-semibold">
                Create account
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </span>
            </span>
          </Link>
        </div>

        {/* Footer with gradient text */}
        <div className="text-center">
          <p className="text-sm bg-gradient-to-r from-purple-200/60 to-blue-200/60 bg-clip-text text-transparent">
            © 2025 AttendEase. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}