import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [dark, setDark] = useState(false);

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [dark]);

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-white dark:bg-gray-900 shadow">
      {/* Logo */}
      <h1
        className="text-xl font-bold text-orange-600 dark:text-violet-400 cursor-pointer"
        onClick={() => navigate("/")}
      >
        Fit Plan Hub
      </h1>

      {/* Right */}
      <div className="flex items-center gap-4">
        {/* Theme Toggle */}
        <button
          onClick={() => setDark(!dark)}
          className="px-3 py-1 rounded bg-gray-200 dark:bg-gray-700 text-sm"
        >
          {dark ? "Light" : "Dark"}
        </button>

        {/* User */}
        <div className="text-sm text-gray-700 dark:text-gray-200">
          <p className="font-medium">{user?.name}</p>
          <p className="text-xs capitalize">{user?.role}</p>
        </div>

        {/* Logout */}
        <button
          onClick={() => {
            logout();
            navigate("/login");
          }}
          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
