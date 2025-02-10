import React, { useState } from "react";
import { supabase } from "../../supabase";

export default function CompatibilityQuestions({ onComplete, firstName, lastName }) {
    const questions = [
        {
            question: "What are you: Introvert, extrovert, or ambivert?",
            options: ["Introvert", "Extrovert", "Ambivert"],
        },
        {
            question: "Pick your ideal date:",
            options: ["A cozy coffee shop date", "A spontaneous road trip", "A movie & dinner night", "A fun gaming night"],
        },
        {
            question: "What's your love language?",
            options: ["Words of affirmation", "Physical touch", "Quality time", "Acts of service", "Gift-giving"],
        },
        {
            question: "Are you more of a texter or a caller?",
            options: ["Texting all the way", "Calling, I love real convos", "Depends on my mood", "In-Person or nothing😭"],
        },
        {
            question: "Do you believe in love at first sight?",
            options: ["Yes, 100%!", "Maybe, if the connection is strong", "No, love takes time"],
        },
        {
            question: "What's your ideal Sunday?",
            options: ["Sleeping in & chilling at home", "Exploring new places & trying new food", "Reading a book & sipping coffee", "Watching Netflix & gaming"],
        },
        {
            question: "Are you a..",
            options: ["Movie person?", "Music Person?", "Novel delulu?", "lost in Literature?"],
        },
        {
            question: "You see your crush in college. What would you do?",
            options: ["Smile & wait for them to notice me", "Walk up and start a random convo", "Text them something flirty later", " Admire, maybe overthink, and do nothing😅"],
        },
        {
            question: "What's your biggest turn-on in a partner?",
            options: ["Confidence & intelligence", "Kindness & emotional maturity", "Sense of humor & fun vibes", "Loyalty & deep conversations"],
        },
        {
            question: "What's your relationship goal?",
            options: [" Something casual & fun", "Serious & long-term", "Open to whatever feels right"],
        },
        {
            question: "How do you like to handle conflicts in relationships?",
            options: ["Talk it out immediately", "Need time to think", " Prefer a calm discussion"],
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