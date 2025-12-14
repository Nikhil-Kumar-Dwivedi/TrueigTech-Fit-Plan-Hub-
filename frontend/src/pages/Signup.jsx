import { useState } from "react";
import api from "../services/api";
import { useNavigate, Link } from "react-router-dom";
import AuthNavbar from "../components/AuthNavbar";

export default function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "trainee",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.post("/auth/signup", form);
    navigate("/login");
  };

  return (
    <>
      <AuthNavbar />

      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 to-orange-100 dark:from-gray-900 dark:to-gray-800">
        <form
          onSubmit={handleSubmit}
          className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-lg w-96"
        >
          <h2 className="text-2xl font-bold text-center text-green-600 dark:text-violet-400 mb-6">
            Create Account
          </h2>

          <input
            className="border dark:border-gray-700 bg-transparent p-3 w-full mb-4 rounded focus:outline-none focus:ring-2 focus:ring-green-400 dark:focus:ring-violet-500"
            placeholder="Name"
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />

          <input
            className="border dark:border-gray-700 bg-transparent p-3 w-full mb-4 rounded focus:outline-none focus:ring-2 focus:ring-green-400 dark:focus:ring-violet-500"
            placeholder="Email"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />

          <input
            className="border dark:border-gray-700 bg-transparent p-3 w-full mb-4 rounded focus:outline-none focus:ring-2 focus:ring-green-400 dark:focus:ring-violet-500"
            type="password"
            placeholder="Password"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />

          <select
            className="border dark:border-gray-700 bg-transparent p-3 w-full mb-4 rounded focus:outline-none"
            onChange={(e) => setForm({ ...form, role: e.target.value })}
          >
            <option value="trainee">Trainee</option>
            <option value="trainer">Trainer</option>
          </select>

          <button className="bg-green-500 hover:bg-green-600 dark:bg-violet-500 dark:hover:bg-violet-600 text-white w-full py-3 rounded font-semibold">
            Signup
          </button>

          <p className="text-sm text-center mt-4 text-gray-600 dark:text-gray-300">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 dark:text-blue-400">
              Login
            </Link>
          </p>
        </form>
      </div>
    </>
  );
}
