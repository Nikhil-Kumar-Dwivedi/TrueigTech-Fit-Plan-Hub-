import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup.jsx";
import TrainerDashboard from "./pages/TrainerDashboard";
import UserFeed from "./pages/UserFeed";
import Navbar from "./components/Navbar";
import { useAuth } from "./context/AuthContext";

export default function App() {
  const { user } = useAuth();

  return (
    <>
      {user && <Navbar />}
      <Routes>
        <Route path="/" element={!user ? <Login /> : <Navigate to={user.role === "trainer" ? "/trainer" : "/feed"} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/trainer" element={<TrainerDashboard />} />
        <Route path="/feed" element={<UserFeed />} />
      </Routes>
    </>
  );
}
