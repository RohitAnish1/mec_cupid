import React, { useEffect, useState } from "react";
import Login from "./components/Login";
import NameForm from "./components/NameForm";
import CompatibilityQuestions from "./components/CompatibilityQuestions";
import ConfirmationPage from "./components/ConfirmationPage";
import { supabase } from "../supabase"; // Ensure correct import
import PreferenceQuestions from "./components/PreferenceQuestions";
import Guidelines from "./components/Guidelines";

export default function App() {
  const [user, setUser] = useState(null);
  const [step, setStep] = useState("login"); // Default step
  const [firstName, setFirstName] = useState(""); // Store first name
  const [lastName, setLastName] = useState(""); // Store last name
  const [number, setNumber] = useState(""); // Store number
  const [preferences, setPreferences] = useState([]); // Store preferences
  const [interests, setInterests] = useState([]); // Store interests

  useEffect(() => {
    const checkUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      
      if (error || !data?.user) {
        setStep("login"); // Show login if no user
      } else {
        setUser(data.user);
        setStep("guidelines"); // Move to name entry step
      }
    };

      checkUser();

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        setUser(session.user);
        setStep("guidelines");
      } else {
        setUser(null);
        setStep("login"); // If logged out, go back to login
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const handlePreferenceSubmit = async (finalPreferences) => {
    setPreferences(finalPreferences);
    setStep("compatibility");
  }

  const handleCompatibilitySubmit = async (finalInterests) => {
    setInterests(finalInterests);
    setStep("submit");
  }

  const handleFormSubmit = async () => {
    // console.log("📌 Submitting Full Data:", { firstName, lastName, number, interests: finalInterests });

    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        console.error("🚨 No session found!");
        alert("You must be logged in to register.");
        return;
      }

      const response = await fetch("https://mec-cupid.onrender.com/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${session.access_token}`, // Send token in header
        },
        body: JSON.stringify({
          firstName,
          lastName,
          number,
          preferences: preferences,
          interests: interests, // Send name and interests together
        }),
      });

      const result = await response.json();
      // console.log("✅ API Response:", result);

      setStep("confirmation");
    } catch (error) {
      console.error("Error submitting registration", error);
      alert("Failed to submit form, please try again");
    }
  };

  return (
    <div className="bg-[#FAC2CD] font-luckiest">
      {step === "login" && <Login onLogin={() => setStep("guidelines")} />}
      {step === "guidelines" && <Guidelines onContinue={() => setStep("name")} />}
      {step === "name" && (
        <NameForm onSubmit={(fname, lname, number) => { 
          setFirstName(fname); 
          setLastName(lname);
          setNumber(number);
          setStep("preferences");
        }} />
      )}
      {step === "preferences" && <PreferenceQuestions onComplete={handlePreferenceSubmit} />}
      {step === "compatibility" && (
        <CompatibilityQuestions 
          onComplete={handleCompatibilitySubmit} // Send everything together
        />
      )}
      {step === "submit" && (
        <div className="flex flex-col items-center justify-center min-h-screen p-6">
          <h2 className="block text-black font-black text-xl mb-4">
            Are you sure you want to enter matchmaking?
          </h2>
          <p className="block text-black font-black text-xl mb-4">
            Once submitted, your preferences will be used to find a compatible match.
          </p>
          <button
            onClick={handleFormSubmit}
            className="w-auto bg-black text-white font-black px-2 text-xl py-4 rounded-full hover:opacity-90 transition"
          >
            Yes, Submit
          </button>
        </div>        
      )}
      {step === "confirmation" && <ConfirmationPage />}
    </div>
  );
}
