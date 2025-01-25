import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Component/Home";
import Login from "./Component/Login";
import Signup from "./Component/Signup";
import ForgotPassword from "./Component/ForgotPassword";
import Profile from "./Component/Profile";
import AttendanceOverview from "./Component/AttendanceOverview";
import HelpSupport from "./Component/HelpSupport";
import Footer from "./Component/Footer";
import Header from "./Component/Header";


const App = () => {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-[#111418] text-white" style={{ fontFamily: "Be Vietnam Pro, Noto Sans, sans-serif" }}>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/attendance-overview" element={<AttendanceOverview />} />
          <Route path="/help-support" element={<HelpSupport />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
