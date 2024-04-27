"use client";
import React, { useState } from "react";
import axios from "axios";

const RemoveBackgroundImage = () => {
  const [image, setImage] = useState(null);
  const [processedImage, setProcessedImage] = useState(null);

  const handleImageUpload = (event) => {
    setImage(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("image", image);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/remove-bg/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const processedImageData = response.data.removed_background_image;
      setProcessedImage(processedImageData);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
          Remove Background
        </h2>
        <form onSubmit={handleSubmit} className="mb-4">
          <div className="mb-4">
            <label
              htmlFor="image"
              className="block text-gray-700 font-bold mb-2"
            >
              Upload Image
            </label>
            <input
              type="file"
              id="image"
              accept="image/*"
              onChange={handleImageUpload}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              disabled={!image}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Remove Background
            </button>
          </div>
        </form>
        {processedImage && (
          <div className="bg-gray-200 p-4 rounded-lg">
            <p className="text-gray-800 font-semibold">Processed Image:</p>
            <img
              src={`data:image/png;base64,${processedImage}`}
              alt="Processed Image"
              className="max-w-full h-auto"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default RemoveBackgroundImage;
