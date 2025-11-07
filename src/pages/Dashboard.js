import React, { useState, useEffect } from "react";
import {
  Home,
  Users,
  BarChart2,
  Settings,
  LogOut,
  Menu,
  X,
  Bell,
} from "lucide-react";
import api from "../services/api"; // We'll connect this later

export default function Dashboard({ user }) {
  const [isOpen, setIsOpen] = useState(true);
  const [stats, setStats] = useState({
    employees: 0,
    projects: 0,
    attendance: "0%",
    departments: 0,
  });

  const toggleSidebar = () => setIsOpen(!isOpen);

  // 📡 Fetch data from API (you can replace URL later)
  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Example API call (replace with your backend endpoint)
        const res = await api.get("/dashboard/stats");
        setStats(res.data);
      } catch (err) {
        console.error("Error fetching dashboard stats:", err);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`${
          isOpen ? "w-64" : "w-20"
        } bg-gradient-to-b from-blue-600 to-indigo-700 text-white flex flex-col transition-all duration-300`}
      >
        <div className="flex items-center justify-between p-4">
          <h2
            className={`text-2xl font-bold transition-opacity ${
              isOpen ? "opacity-100" : "opacity-0"
            }`}
          >
            EMS
          </h2>
          <button
            onClick={toggleSidebar}
            className="text-white focus:outline-none"
          >
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>

        <nav className="flex-1 mt-6">
          <ul className="space-y-2">
            <li className="flex items-center px-4 py-2 hover:bg-blue-500 cursor-pointer">
              <Home className="mr-3" /> {isOpen && "Dashboard"}
            </li>
            <li className="flex items-center px-4 py-2 hover:bg-blue-500 cursor-pointer">
              <Users className="mr-3" /> {isOpen && "Employees"}
            </li>
            <li className="flex items-center px-4 py-2 hover:bg-blue-500 cursor-pointer">
              <BarChart2 className="mr-3" /> {isOpen && "Reports"}
            </li>
            <li className="flex items-center px-4 py-2 hover:bg-blue-500 cursor-pointer">
              <Settings className="mr-3" /> {isOpen && "Settings"}
            </li>
          </ul>
        </nav>

        <div className="p-4 border-t border-blue-500 hover:bg-blue-500 cursor-pointer">
          <LogOut className="inline mr-3" /> {isOpen && "Logout"}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Navbar */}
        <div className="flex items-center justify-between bg-white px-6 py-4 shadow-md">
          <h1 className="text-2xl font-semibold text-gray-700">
            Welcome, {user}! 🎉
          </h1>
          <div className="flex items-center space-x-4">
            <Bell className="text-gray-600 w-6 h-6 cursor-pointer" />
            <img
              src="https://i.pravatar.cc/40"
              alt="profile"
              className="w-10 h-10 rounded-full border-2 border-indigo-500"
            />
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Employee Count */}
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <h2 className="text-gray-500 text-sm font-semibold uppercase">
              Employees
            </h2>
            <p className="text-3xl font-bold text-blue-600 mt-2">
              {stats.employees}
            </p>
          </div>

          {/* Projects */}
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <h2 className="text-gray-500 text-sm font-semibold uppercase">
              Projects
            </h2>
            <p className="text-3xl font-bold text-green-600 mt-2">
              {stats.projects}
            </p>
          </div>

          {/* Attendance */}
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <h2 className="text-gray-500 text-sm font-semibold uppercase">
              Attendance
            </h2>
            <p className="text-3xl font-bold text-yellow-600 mt-2">
              {stats.attendance}
            </p>
          </div>

          {/* Departments */}
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <h2 className="text-gray-500 text-sm font-semibold uppercase">
              Departments
            </h2>
            <p className="text-3xl font-bold text-purple-600 mt-2">
              {stats.departments}
            </p>
          </div>
        </div>

        {/* Summary Section */}
        <div className="p-6">
          <div className="bg-white p-8 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">
              Quick Overview
            </h2>
            <p className="text-gray-600">
              Manage your employees, monitor attendance, and track projects
              efficiently. Data updates in real time from your API.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
