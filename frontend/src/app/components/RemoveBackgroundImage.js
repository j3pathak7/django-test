"use client";
import React, { useState } from "react";
import axios from "axios";

const RemoveBackgroundImage = () => {
  const [image, setImage] = useState(null);
  const [processedImage, setProcessedImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImageUpload = (event) => {
    setImage(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("image", image);

    setLoading(true);

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
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (processedImage) {
      // Convert base64 image to blob
      const byteCharacters = atob(processedImage);
      const byteArrays = [];

      for (let offset = 0; offset < byteCharacters.length; offset += 512) {
        const slice = byteCharacters.slice(offset, offset + 512);

        const byteNumbers = new Array(slice.length);
        for (let i = 0; i < slice.length; i++) {
          byteNumbers[i] = slice.charCodeAt(i);
        }

        const byteArray = new Uint8Array(byteNumbers);
        byteArrays.push(byteArray);
      }

      const blob = new Blob(byteArrays, { type: "image/png" });

      // Create download link
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "processed_image.png");
      document.body.appendChild(link);
      link.click();

      // Cleanup
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
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
          <div className="flex justify-center space-x-4">
            <button
              type="submit"
              disabled={!image || loading}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              {loading ? "Processing..." : "Remove Background"}
            </button>
          </div>
        </form>
        {processedImage && (
          <div className="bg-gray-200 p-4 rounded-lg mt-4">
            <div className="my-8">
              <p className="text-gray-800 font-semibold">Processed Image:</p>
              <img
                src={`data:image/png;base64,${processedImage}`}
                alt="Processed Image"
                className="max-w-full h-auto"
              />
            </div>
            <div className="flex justify-center">
              {" "}
              {/* Container for centering */}
              <button
                type="button"
                onClick={handleDownload}
                disabled={!processedImage}
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Download Processed Image
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RemoveBackgroundImage;
