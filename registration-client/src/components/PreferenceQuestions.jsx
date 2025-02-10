import React, { useState } from "react";

export default function PreferenceQuestions({ onComplete }) {
    const questions = [
        { question: "What is your age?", type: "number" },
        { question: "What is your gender?", options: ["M", "F"] },
        { question: "What age group do you prefer in a partner?", options: ["Younger", "Older", "Same"] },
        { question: "What gender do you prefer in a partner?", options: ["M", "F"] }
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
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h2 className="text-xl font-bold text-gray-700 mb-4">
                {questions[currentQuestion].question}
            </h2>
            <div className="flex flex-col space-y-2">
                {questions[currentQuestion].type === "number" ? (
                    <>
                        <input
                            type="number"
                            className="border-none bg-white p-2 rounded-lg"
                            value={ageInput}
                            onChange={(e) => setAgeInput(e.target.value)}
                        />
                        <button
                            onClick={() => handleOptionSelect(Number(ageInput))}
                            className="bg-red-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-red-600 transition"
                        >
                            Next
                        </button>
                    </>
                ) : (
                    questions[currentQuestion].options.map((option, index) => (
                        <button
                            key={index}
                            onClick={() => handleOptionSelect(option)}
                            className="bg-red-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-red-600 transition"
                        >
                            {option}
                        </button>
                    ))
                )}
            </div>
        </div>
    );
}
