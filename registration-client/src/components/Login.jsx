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
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-[32px] mb-6">Welcome to MEC Cupid</h1>
      <button
        onClick={handleGoogleLogin}
        className="bg-white rounded-[100px] px-4 py-2 text-[40px]"
        disabled={loading}
      >
        {loading ? "Signing in..." : "Sign In"}
      </button>
    </div>
  );
}
