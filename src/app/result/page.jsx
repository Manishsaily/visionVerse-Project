"use client";

import { useState, useEffect } from "react";
import ResultManager from "../components/ResultManager";
import ResultTemplate from "../components/ResultTemplate";

export default function ResultPage() {
  const [backgroundColor, setBackgroundColor] = useState("white");
  const [buttonColor, setButtonColor] = useState("lightblue");
  const [buttonStyle, setButtonStyle] = useState("style1");
  const [results, setResults] = useState([]);
  const [submittedCoupon, setSubmittedCoupon] = useState(null);

  const handleSubmitCoupon = (coupon) => {
    setSubmittedCoupon(coupon);
  };

  // Load colors and styles from localStorage on client side
  useEffect(() => {
    const savedBackgroundColor = localStorage.getItem("backgroundColor");
    const savedButtonColor = localStorage.getItem("buttonColor");
    const savedButtonStyle = localStorage.getItem("buttonStyle");

    if (savedBackgroundColor) setBackgroundColor(savedBackgroundColor);
    if (savedButtonColor) setButtonColor(savedButtonColor);
    if (savedButtonStyle) setButtonStyle(savedButtonStyle);
  }, []);

  // Save values to localStorage when they change
  useEffect(() => {
    localStorage.setItem("backgroundColor", backgroundColor);
  }, [backgroundColor]);

  useEffect(() => {
    localStorage.setItem("buttonColor", buttonColor);
  }, [buttonColor]);

  useEffect(() => {
    localStorage.setItem("buttonStyle", buttonStyle);
  }, [buttonStyle]);

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
