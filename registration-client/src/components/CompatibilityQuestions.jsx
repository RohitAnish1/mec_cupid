import React, { useState } from "react";
import { supabase } from "../../supabase";

export default function CompatibilityQuestions({ onComplete, firstName, lastName }) {
    const questions = [
        {
            question: "What's your ideal date?",
            options: ["Dinner", "Movie", "Adventure", "Stay Home"],
        },
        {
            question: "Favorite romantic movie?",
            options: [
                "Titanic",
                "Notebook",
                "La La Land",
                "A Walk to Remember",
            ],
        },
        {
            question: "Do you believe in love at first sight?",
            options: ["Yes", "No", "Maybe"],
        },
        {
            question: "What's your love language?",
            options: ["Words", "Gifts", "Time", "Touch"],
        },
        {
            question: "Dream honeymoon destination?",
            options: ["Paris", "Bali", "Maldives", "Switzerland"],
        },
    ];

    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState([]);
    const [loading, setLoading] = useState(false); // Added loading state

    const handleOptionSelect = (option) => {
        const updatedAnswers = [...answers, option];
        setAnswers(updatedAnswers);
      
        if (currentQuestion < questions.length - 1) {
          setCurrentQuestion(currentQuestion + 1);
        } else {
          onComplete(updatedAnswers); // Send everything to `App.jsx`
        }
      };
      
      
      
      
      
      

    if (loading) {
        return <div>Submitting, please wait...</div>;
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-pink-100">
            <h2 className="text-xl font-bold text-gray-700 mb-4">
                {questions[currentQuestion].question}
            </h2>
            <div className="flex flex-col space-y-2">
                {questions[currentQuestion].options.map((option, index) => (
                    <button
                        key={index}
                        onClick={() => handleOptionSelect(option)}
                        className="bg-red-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-red-600 transition"
                    >
                        {option}
                    </button>
                ))}
            </div>
        </div>
    );
}