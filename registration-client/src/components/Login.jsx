import React, { useEffect, useState } from "react";
import { supabase } from "../../supabase"; // Use named import (curly brackets)

export default function Login({ onLogin }) {
  const [loading, setLoading] = useState(false);

  const handleGoogleLogin = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: "http://localhost:5173" }, // Change this in production
    });

    if (error) {
      console.error("Google login failed:", error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (data.user) {
        onLogin(); // Navigate to next page
      }
    };
    checkUser();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-pink-100">
      <h1 className="text-2xl font-bold text-gray-700 mb-6">Welcome to MEC Cupid 💖</h1>
      <button
        onClick={handleGoogleLogin}
        className="bg-red-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-red-600 transition"
        disabled={loading}
      >
        {loading ? "Signing in..." : "Sign in with Google"}
      </button>
    </div>
  );
}
