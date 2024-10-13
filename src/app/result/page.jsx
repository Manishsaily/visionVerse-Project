"use client";

import { useState } from "react";
import ResultManager from "../components/ResultManager";
import ResultTemplate from "../components/ResultTemplate";

export default function ResultPage() {
  const [results, setResults] = useState([
    {
      message: "Congratulations!",
      couponDetails: "10% off",
      expirationDate: "2024-12-31",
      imageUrl: "/coffee-2.webp",
    },
  ]);

  const [backgroundColor] = useState(() => {
    try {
      return localStorage.getItem("backgroundColor") || "white";
    } catch (error) {
      console.error("Error accessing localStorage", error);
      return "white";
    }
  });

  const [buttonColor] = useState(() => {
    try {
      return localStorage.getItem("buttonColor") || "lightblue";
    } catch (error) {
      console.error("Error accessing localStorage", error);
      return "lightblue";
    }
  });

  const [buttonStyle] = useState(() => {
    try {
      return localStorage.getItem("buttonStyle") || "style1";
    } catch (error) {
      console.error("Error accessing localStorage", error);
      return "style1";
    }
  });

  const handleMessageChange = (index, event) => {
    const newResults = [...results];
    newResults[index].message = event.target.value;
    setResults(newResults);
  };

  const handleDetailsChange = (index, event) => {
    const newResults = [...results];
    newResults[index].couponDetails = event.target.value;
    setResults(newResults);
  };

  const handleExpirationDateChange = (index, event) => {
    const newResults = [...results];
    newResults[index].expirationDate = event.target.value;
    setResults(newResults);
  };

  const handleImageUpload = (index, event) => {
    const file = event.target.files[0]; // Get the uploaded file
    if (file) {
      const imageUrl = URL.createObjectURL(file); // Create a URL for the file
      const updatedTemplates = [...results];
      updatedTemplates[index].imageUrl = imageUrl; // Update the image URL
      setResults(updatedTemplates);
    }
  };

  const removeImage = (index) => {
    const updatedTemplates = [...results];
    updatedTemplates[index].imageUrl = ""; // Clear the image URL
    setResults(updatedTemplates);
  };

  const handleSubmitCoupons = async (e) => {
    e.preventDefault(); // Prevent the default form submission

    try {
      for (const result of results) {
        const { message, couponDetails, expirationDate, imageUrl } = result;

        const response = await fetch("/api/coupons", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message,
            couponDetails,
            expirationDate,
            imageUrl,
          }),
        });

        const couponResult = await response.json();

        if (couponResult.error) {
          console.error(couponResult.error);
          alert("Failed to create coupon: " + couponResult.error);
          return;
        }
      }

      alert("Coupons created successfully!");
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while creating the coupons.");
    }
  };

  return (
    <div className="flex min-h-full bg-gray-100 text-black">
      {/* Editor Controls */}
      <div className="w-1/4 ml-20 p-4 mt-6 bg-white border-r border-gray-300 rounded-xl shadow-lg">
        <form onSubmit={handleSubmitCoupons}>
          {/* Questions and Image Uploads */}
          <ResultManager
            results={results}
            setResults={setResults}
            handleMessageChange={handleMessageChange}
            handleExpirationDateChange={handleExpirationDateChange}
            handleDetailsChange={handleDetailsChange}
            handleImageUpload={handleImageUpload}
            removeImage={removeImage}
          />
          <button
            type="submit"
            className="mt-4 bg-green-500 text-white py-2 px-4 rounded-full hover:bg-green-600"
          >
            Submit Coupon
          </button>
        </form>
      </div>

      {/* Template Preview */}
      <div className="flex ml-52 p-4">
        {results.map((result, index) => (
          <ResultTemplate
            key={index}
            buttonColor={buttonColor}
            backgroundColor={backgroundColor}
            buttonStyle={buttonStyle}
            message={result.message}
            expirationDate={result.expirationDate}
            couponDetails={result.couponDetails}
            imageUrl={result.imageUrl}
            onRetry={() => alert("Coupon functionality")}
            onHome={() => alert("Go to Home functionality")}
          />
        ))}
      </div>
    </div>
  );
}
