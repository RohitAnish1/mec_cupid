import React, { useState } from "react";
import { supabase } from "../../supabase";
import introvertImg from '../assets/1.png';
import dateImg from '../assets/2.png';
import loveLanguageImg from '../assets/3.png';
import textingImg from '../assets/4.png';
import loveSightImg from '../assets/5.png';
import sundayImg from '../assets/6.png';
import entertainmentImg from '../assets/7.png';
import crushImg from '../assets/8.png';
import turnOnImg from '../assets/9.png';
import relationshipImg from '../assets/10.png';
import conflictImg from '../assets/11.png';

export default function CompatibilityQuestions({
  onComplete,
  firstName,
  lastName,
}) {
  const questions = [
    {
      question: "What are you: Introvert, extrovert, or ambivert?",
      options: ["Introvert", "Extrovert", "Ambivert"],
      backgroundImage: introvertImg
    },
    {
      question: "Pick your ideal date:",
      options: [
        "A cozy coffee shop date",
        "A spontaneous road trip",
        "A movie & dinner night",
        "A fun gaming night",
      ],
      backgroundImage: dateImg
    },
    {
      question: "What's your love language?",
      options: [
        "Words of affirmation",
        "Physical touch",
        "Quality time",
        "Acts of service",
        "Gift-giving",
      ],
      backgroundImage: loveLanguageImg
    },
    {
      question: "Are you more of a texter or a caller?",
      options: [
        "Texting all the way",
        "Calling, I love real convos",
        "Depends on my mood",
        "In-Person or nothing😭",
      ],
      backgroundImage: textingImg
    },
    {
      question: "Do you believe in love at first sight?",
      options: [
        "Yes, 100%!",
        "Maybe, if the connection is strong",
        "No, love takes time",
      ],
      backgroundImage: loveSightImg
    },
    {
      question: "What's your ideal Sunday?",
      options: [
        "Sleeping in & chilling at home",
        "Exploring new places & trying new food",
        "Reading a book & sipping coffee",
        "Watching Netflix & gaming",
      ],
      backgroundImage: sundayImg
    },
    {
      question: "Are you a..",
      options: [
        "Movie person?",
        "Music Person?",
        "Novel delulu?",
        "lost in Literature?",
      ],
      backgroundImage: entertainmentImg
    },
    {
      question: "You see your crush in college. What would you do?",
      options: [
        "Smile & wait for them to notice me",
        "Walk up and start a random convo",
        "Text them something flirty later",
        " Admire, maybe overthink, and do nothing😅",
      ],
      backgroundImage: crushImg
    },
    {
      question: "What's your biggest turn-on in a partner?",
      options: [
        "Confidence & intelligence",
        "Kindness & emotional maturity",
        "Sense of humor & fun vibes",
        "Loyalty & deep conversations",
      ],
      backgroundImage: turnOnImg
    },
    {
      question: "What's your relationship goal?",
      options: [
        " Something casual & fun",
        "Serious & long-term",
        "Open to whatever feels right",
      ],
      backgroundImage: relationshipImg
    },
    {
      question: "How do you like to handle conflicts in relationships?",
      options: [
        "Talk it out immediately",
        "Need time to think",
        " Prefer a calm discussion",
      ],
      backgroundImage: conflictImg
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
    <div className="flex flex-col items-center justify-center min-h-screen p-4 relative">
      <img 
        src={questions[currentQuestion].backgroundImage} 
        alt="Question illustration"
        className="absolute bottom-0 left-1/2 transform -translate-x-1/2 max-h-96 z-0" 
      />
      
      <div className="w-full max-w-md relative z-10"> {/* Added z-10 to keep content above image */}
        <h2 className="block text-black font-black text-xl mb-4">
          {questions[currentQuestion].question}
        </h2>
        <div className="flex flex-col space-y-2 w-full">
          {questions[currentQuestion].options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleOptionSelect(option)}
              className="w-full bg-black text-white font-black px-2 text-xl py-4 rounded-full hover:opacity-90 transition"
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
