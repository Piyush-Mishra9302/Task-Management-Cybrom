import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LogIn } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userType) {
      toast.warning("Please select a user type!");
      return;
    }

    try {
      if (userType === "admin") {
        const api = `${import.meta.env.VITE_BACKEND_URL}/admin/login`;
        const response = await axios.post(api, { email, password });

        localStorage.setItem("adminname", response.data.Admin.name);
        localStorage.setItem("adminemail", response.data.Admin.email);

        toast.success(response.data.msg || "Admin login successful!");
        setTimeout(() => navigate("/admin-dashboard"), 1500);
      } 
      else if (userType === "employee") {
        const api = `${import.meta.env.VITE_BACKEND_URL}/admin/employee-login`;
        const response = await axios.post(api, { email, password });

        localStorage.setItem("employeename", response.data.employee.name);
        localStorage.setItem("employeeemail", response.data.employee.email);

        toast.success("Employee login successful!");
        setTimeout(() => navigate("/employee-dashboard"), 1500);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.msg || "Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-400 via-blue-600 to-indigo-700 relative overflow-hidden">
      {/* Background Glow Effects */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl animate-pulse"></div>

      {/* Login Card */}
      <div className="w-full max-w-sm bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl p-8 z-10">
        <h2 className="text-3xl font-bold text-center text-white mb-2 drop-shadow-lg flex items-center justify-center gap-2">
          <LogIn className="w-7 h-7 text-white" /> Login Portal
        </h2>
        <p className="text-center text-blue-100 mb-6 text-sm">
          Please sign in to continue
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email Field */}
          <div>
            <label className="block text-white/90 text-sm mb-2">
              Email address
            </label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-white/20 placeholder-white/70 border border-white/30 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-300"
              placeholder="Enter your email"
            />
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-white/90 text-sm mb-2">Password</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-white/20 placeholder-white/70 border border-white/30 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-300"
              placeholder="Enter your password"
            />
          </div>

          {/* User Type */}
          <div>
            <label className="block text-white/90 text-sm mb-2">
              Select User Type
            </label>
            <select
              name="usertype"
              value={userType}
              onChange={(e) => setUserType(e.target.value)}
              required
              className="w-full bg-white/20 text-black border border-white/30 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              <option value="">Select user type</option>
              <option value="employee">Employee</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 via-blue-600 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold py-2.5 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Login
          </button>
        </form>
      </div>

      {/* Toast Container */}
      <ToastContainer position="top-right" autoClose={2000} hideProgressBar={false} theme="colored" />
    </div>
  );
};

export default Login;
