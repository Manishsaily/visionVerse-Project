"use client";

import { useState } from "react";
import ResultManager from "../components/ResultManager";
import ResultTemplate from "../components/ResultTemplate";

export default function ResultPage() {
  const [results, setResults] = useState([
    { message: "Congratulations!", couponDetails: "10% off", expirationDate: "2024-12-31", imageUrl: "/coffee-2.webp" }
  ]);
  
  const [submittedCoupon, setSubmittedCoupon] = useState(null);
  const handleSubmitCoupon = (coupon) => {
    setSubmittedCoupon(coupon);
  };

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

  const addNewResult = () => {
    setResults([
      ...results,
      { message: "You have won something!", coupon: "" },
    ]);
  };

  const removeResult = (index) => {
    setResults(results.filter((_, i) => i !== index));
  };

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

  return (
    <div className="flex min-h-full bg-gray-100 text-black">
      {/* Editor Controls */}
      <div className="w-1/4 ml-20 p-4 mt-6 bg-white border-r border-gray-300 rounded-xl shadow-lg">
        <form>
          {/* Questions and Image Uploads */}
          <ResultManager
            results={results}
            setResults={setResults}
            onSubmitCoupon={handleSubmitCoupon}
            removeResult={removeResult}
            handleMessageChange={handleMessageChange}
            handleExpirationDateChange={handleExpirationDateChange}
            handleDetailsChange={handleDetailsChange}
            handleImageUpload={handleImageUpload}
            removeImage={removeImage}
          />
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
