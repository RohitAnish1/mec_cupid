import React, { useState } from "react";
import DetailsImage from "../assets/details.png"

export default function NameForm({ onSubmit }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [number, setNumber] = useState("");

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#FAC2CD] relative">
      <img 
        src={DetailsImage} 
        alt="Details decoration" 
        className="absolute bottom-0 left-0 z-0"
      />
      
      <div className="bg-black text-white px-8 py-2 rounded-full mb-4 relative z-10">
        <h2 className="text-2xl font-black">ENTER YOUR DETAILS:</h2>
      </div>

      <div className="w-full max-w-md px-4 relative z-10">
        <label className="block text-black font-black mb-2 text-xl">
          ENTER FIRST NAME:
        </label>
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className="w-full p-3 bg-white rounded-full border-none mb-4"
        />

        <label className="block text-black font-black mb-2 text-xl">
          ENTER LAST NAME:
        </label>
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          className="w-full p-3 bg-white rounded-full border-none mb-4"
        />

        <label className="block text-black font-black mb-2 text-xl">
          ENTER WHATSAPP NUMBER:
        </label>
        <input
          type="text"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          className="w-full p-3 bg-white rounded-full border-none mb-4"
        />

        <button
          onClick={() => onSubmit(firstName, lastName, number)}
          className="w-full bg-black text-white font-black text-xl py-4 rounded-full hover:opacity-90 transition"
        >
          NEXT
        </button>
      </div>
    </div>
  );
}
