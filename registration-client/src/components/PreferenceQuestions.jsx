import React, { useState } from "react";
import DetailsImage from "../assets/details.png";

export default function PreferenceQuestions({ onComplete }) {
  const questions = [
    { question: "What is your age?", type: "number" },
    { question: "What is your gender?", options: ["M", "F"] },
    {
      question: "What age group do you prefer in a partner?",
      options: ["Younger", "Older", "Same"],
    },
    {
      question: "What gender do you prefer in a partner?",
      options: ["M", "F"],
    },
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [ageInput, setAgeInput] = useState("");

  const handleOptionSelect = (answer) => {
    const updatedAnswers = { ...answers, [currentQuestion]: answer };
    setAnswers(updatedAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      onComplete(updatedAnswers); // Callback when all questions are answered
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 relative">
      <img 
        src={DetailsImage} 
        alt="Details decoration" 
        className="absolute bottom-0 left-0 z-0"
      />
      
      <h2 className="block text-black font-black text-xl mb-4 relative z-10">
        {questions[currentQuestion].question}
      </h2>
      <div className="flex flex-col space-y-2 w-full relative z-10">
        {questions[currentQuestion].type === "number" ? (
          <>
            <input
              type="text"
              value={ageInput}
              onChange={(e) => setAgeInput(e.target.value)}
              className="w-full p-3 bg-white rounded-full border-none mb-12"
            />
            <button
              onClick={() => handleOptionSelect(Number(ageInput))}
              className="w-full bg-black text-white font-black text-xl px-2 py-4 rounded-full hover:opacity-90 transition"
              >
              Next
            </button>
          </>
        ) : (
          questions[currentQuestion].options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleOptionSelect(option)}
              className="w-full bg-black text-white font-black text-xl px-2 py-4 rounded-full hover:opacity-90 transition"
              >
              {option}
            </button>
          ))
        )}
      </div>
    </div>
  );
}
