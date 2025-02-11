import React from "react";

export default function Guidelines({ onContinue }) {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-6">
            <div className="p-6 rounded-lg max-w-md text-center">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Blind Dating Guidelines</h2>
                <p className="mb-2">Before entering, please agree to these:</p>
                <ul className="text-left list-disc list-inside mb-4">
                    <li><strong>Respect & Consent</strong> - No means no. Be kind and respectful.</li>
                    <li><strong>Keep It Fun & Safe</strong> - No pranks, dares, or risky/hurtful behavior.</li>
                    <li><strong>No Harassment</strong> - Any misconduct will lead to strict action.</li>
                    <li><strong>Respect Privacy</strong> - Don't pressure anyone for personal details.</li>
                    <li><strong>Your Responsibility</strong> - Fortitude MEC and the college are not liable for any interactions beyond this event.</li>
                </ul>
                <p className="text-gray-700 mb-4">By continuing, you agree to follow these rules.</p>
                <button 
                    onClick={onContinue} 
                    className="w-full bg-black text-white font-black text-xl px-2 py-4 rounded-full hover:opacity-90 transition"
                >
                    Continue
                </button>
            </div>
        </div>
    );
}
