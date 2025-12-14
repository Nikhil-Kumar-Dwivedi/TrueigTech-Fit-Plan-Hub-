import { useState } from "react";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import AuthNavbar from "../components/AuthNavbar";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", { email, password });
      login(res.data);
      navigate(res.data.role === "trainer" ? "/trainer" : "/feed");
    } catch {
      alert("Invalid credentials");
    }
  };

  return (
    <>
      <AuthNavbar />

      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-100 to-red-100 dark:from-gray-900 dark:to-gray-800">
        <form
          onSubmit={handleSubmit}
          className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-lg w-96"
        >
          <h2 className="text-2xl font-bold text-center text-orange-600 dark:text-violet-400 mb-6">
            Welcome Back
          </h2>

          <input
            className="border dark:border-gray-700 bg-transparent p-3 w-full mb-4 rounded focus:outline-none focus:ring-2 focus:ring-orange-400 dark:focus:ring-violet-500"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            className="border dark:border-gray-700 bg-transparent p-3 w-full mb-4 rounded focus:outline-none focus:ring-2 focus:ring-orange-400 dark:focus:ring-violet-500"
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button className="bg-orange-500 hover:bg-orange-600 dark:bg-violet-500 dark:hover:bg-violet-600 text-white w-full py-3 rounded font-semibold">
            Login
          </button>

          <p className="text-sm text-center mt-4 text-gray-600 dark:text-gray-300">
            No account?{" "}
            <Link to="/signup" className="text-blue-600 dark:text-blue-400">
              Signup
            </Link>
          </p>
        </form>
      </div>
    </>
  );
}
