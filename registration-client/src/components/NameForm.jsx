import React, { useState } from "react";

export default function NameForm({ onSubmit }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-pink-100">
      <h2 className="text-2xl font-bold text-gray-700 mb-4">Enter Your Name</h2>
      <input
        type="text"
        placeholder="First Name"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        className="p-2 border border-gray-300 rounded mb-2"
      />
      <input
        type="text"
        placeholder="Last Name"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        className="p-2 border border-gray-300 rounded mb-4"
      />
      <button
        onClick={() => onSubmit(firstName, lastName)}
        className="bg-red-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-red-600 transition"
      >
        Next
      </button>
    </div>
  );
}
