import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (password === "admin123") {
      navigate("/approve");
    } else {
      alert("Incorrect password");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold">Admin Login</h1>
      <input
        type="password"
        placeholder="Enter Admin Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="p-2 border rounded mt-4"
      />
      <button
        onClick={handleLogin}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
      >
        Login
      </button>
    </div>
  );
}
