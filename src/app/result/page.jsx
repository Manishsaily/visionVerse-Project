"use client";

import { useState, useEffect } from "react";
import ResultManager from "../components/ResultManager";
import ResultTemplate from "../components/ResultTemplate";

export default function ResultPage() {
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

  const [buttonStyle, setButtonStyle] = useState(() => {
    try {
      return localStorage.getItem("buttonStyle") || "style1";
    } catch (error) {
      console.error("Error accessing localStorage", error);
      return "style1";
    }
  });

  // Saving backgroundColor and buttonColor to localStorage
  useEffect(() => {
    try {
      localStorage.setItem("backgroundColor", backgroundColor);
    } catch (error) {
      console.error("Error setting backgroundColor in localStorage", error);
    }
  }, [backgroundColor]);

  useEffect(() => {
    try {
      localStorage.setItem("buttonColor", buttonColor);
    } catch (error) {
      console.error("Error setting buttonColor in localStorage", error);
    }
  }, [buttonColor]);

  useEffect(() => {
    try {
      localStorage.setItem("buttonStyle", buttonStyle);
    } catch (error) {
      console.error("Error setting buttonStyle in localStorage", error);
    }
  }, [buttonStyle]);

  const [results, setResults] = useState([
    { message: "You have won a free coffee!", coupon: "" },
  ]);

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
      const updatedTemplates = [...templates];
      updatedTemplates[index].imageUrl = imageUrl; // Update the image URL
      setTemplates(updatedTemplates);
    }
  };

  const removeImage = (index) => {
    const updatedTemplates = [...templates];
    updatedTemplates[index].imageUrl = ""; // Clear the image URL
    setTemplates(updatedTemplates);
  };

  return (
    <div className="flex min-h-full bg-gray-100 text-black">
      {/* Editor Controls */}
      <div className="w-1/4 ml-20 p-4 mt-6 bg-white border-r border-gray-300 rounded-xl shadow-lg">
        <form>
          {/* Questions and Image Uploads */}
          <ResultManager
            results={results}
            addNewResult={addNewResult}
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
            message={result.message} // Corrected to pass a string, not an array
            expirationDate={result.expirationDate} // Ensure this exists
            couponDetails={result.couponDetails} // Ensure this is defined as well
            imageUrl={result.imageUrl}
            onRetry={() => alert("Coupon functionality")}
            onHome={() => alert("Go to Home functionality")}
          />
        ))}
      </div>
    </div>
  );
}
