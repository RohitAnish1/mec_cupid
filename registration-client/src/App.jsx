import React, { useEffect, useState } from "react";
import Login from "./components/Login";
import NameForm from "./components/NameForm";
import CompatibilityQuestions from "./components/CompatibilityQuestions";
import ConfirmationPage from "./components/ConfirmationPage";
import { supabase } from "../supabase"; // Ensure correct import
import PreferenceQuestions from "./components/PreferenceQuestions";

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
        setStep("name"); // Move to name entry step
      }
    };

    checkUser();

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        setUser(session.user);
        setStep("name");
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

  const handleFormSubmit = async (finalInterests) => {
    setInterests(finalInterests);

    console.log("📌 Submitting Full Data:", { firstName, lastName, interests: finalInterests });

    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        console.error("🚨 No session found!");
        alert("You must be logged in to register.");
        return;
      }

      const response = await fetch("http://localhost:5000/api/register", {
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
          interests: finalInterests, // Send name and interests together
        }),
      });

      const result = await response.json();
      console.log("✅ API Response:", result);

      setStep("confirmation");
    } catch (error) {
      console.error("Error submitting registration", error);
      alert("Failed to submit form, please try again");
    }
  };

  return (
    <div className="bg-[#FAC2CD] font-luckiest">
      {step === "login" && <Login onLogin={() => setStep("name")} />}
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
          onComplete={handleFormSubmit} // Send everything together
        />
      )}
      {step === "confirmation" && <ConfirmationPage />}
    </div>
  );
}
