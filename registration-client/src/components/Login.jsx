import React, { useEffect, useState } from "react";
import Logo from "../assets/fortitude_logo.svg"
import { FcGoogle } from "react-icons/fc";
import { supabase } from "../../supabase"; // Use named import (curly brackets)
import LoginImage from "../assets/login_page_image.svg"

export default function Login({ onLogin }) {
  const [loading, setLoading] = useState(false);

  const handleGoogleLogin = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: "https://mec-cupid.vercel.app/" }, // Change this in production
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
    <div className="relative flex flex-col items-center justify-center h-screen overflow-hidden">
      <div className="absolute -top-10 flex flex-col gap-2 h-20">
        <img src={Logo} alt="Logo" />
        <h4 className="text-xl absolute text-center w-full top-36 text-white font-medium">Fortitude MEC</h4>
      </div>
      <h1 className="text-[32px] mb-2 pt-4 mt-10">Welcome to MEC Cupid</h1>
      <img src={LoginImage} alt="Login Image" className="rounded-xl mb-6 w-[80%] xs:w-[60%] sm:w-[50%] md:w-[37%] lg:w-[30%] xl:w-[25%]" />
      <button
        onClick={handleGoogleLogin}
        className="bg-white rounded-[100px] px-4 py-2 text-[40px] flex items-center gap-2 max-h-[68px]"
        disabled={loading}
      >
        <FcGoogle className="text-4xl" />
        <span className="pt-2">{loading ? "Signing in..." : "Sign In"}</span>
      </button>
    </div>
  );
}
