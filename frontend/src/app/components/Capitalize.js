"use client";
import React, { useState } from "react";
import axios from "axios";

const CapitalizeText = () => {
  const [text, setText] = useState("");
  const [capitalizedText, setCapitalizedText] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/capitalize/`,
        { text }
      );
      setCapitalizedText(response.data.capitalized_text);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
          Capitalize Text
        </h2>
        <form onSubmit={handleSubmit} className="mb-4">
          <div className="mb-4">
            <label
              htmlFor="text"
              className="block text-gray-700 font-bold mb-2"
            >
              Enter Text
            </label>
            <input
              type="text"
              id="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Capitalize
            </button>
          </div>
        </form>
        <div className="bg-gray-200 p-4 rounded-lg">
          <p className="text-gray-800 font-semibold">Capitalized Text:</p>
          <p className="text-gray-700">{capitalizedText}</p>
        </div>
      </div>
    </div>
  );
};

export default CapitalizeText;
