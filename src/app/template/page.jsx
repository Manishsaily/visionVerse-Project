"use client";

import React, { useState, useEffect } from "react";
import TemplatePreview from "../components/TemplatePreview";
import { MdViewStream, MdViewModule } from "react-icons/md";

export default function TemplatePage() {
  const [templates] = useState([
    {
      question: "What is the Question?",
      answers: ["Answer 1", "Answer 2", "Answer 3", "Answer 4"],
    },
  ]);

  // Initialize layout state with localStorage or default to 'stacked'
  const [layout, setLayout] = useState(() => {
    try {
      return localStorage.getItem("layout") || "stacked";
    } catch (error) {
      console.error("Error accessing localStorage", error);
      return "stacked";
    }
  });

  // Initialize buttonStyle state with localStorage or default to 'style1'
  const [buttonStyle] = useState(() => {
    try {
      return localStorage.getItem("buttonStyle") || "style1";
    } catch (error) {
      console.error("Error accessing localStorage", error);
      return "style1";
    }
  });

  // Handle layout change and update both state and localStorage
  const handleLayoutChange = (newLayout) => {
    setLayout(newLayout);
    try {
      localStorage.setItem("layout", newLayout);
    } catch (error) {
      console.error("Error setting layout in localStorage", error);
    }
  };


  // Effect to sync layout changes across tabs
  useEffect(() => {
    const syncLayoutAcrossTabs = (event) => {
      if (event.key === "layout") {
        setLayout(event.newValue);
      }
    };

    // Listen for the storage event to sync changes
    window.addEventListener("storage", syncLayoutAcrossTabs);

    // Cleanup the event listener when the component unmounts
    return () => {
      window.removeEventListener("storage", syncLayoutAcrossTabs);
    };
  }, []);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = 1; // Replace with the actual user ID
    const layout = localStorage.getItem("layout") || "stacked";
    const backgroundColor = localStorage.getItem("backgroundColor") || "white";
    const buttonColor = localStorage.getItem("buttonColor") || "lightblue";
    const isLarge = localStorage.getItem("isLarge") || false;
    const buttonStyle = localStorage.getItem("buttonStyle") || "style1";

    try {
      const response = await fetch("/api/quizzes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          layout,
          backgroundColor,
          buttonColor,
          userId,
          isLarge,
          buttonStyle,
        }), // Ensure templateId is sent as an integer
      });

      const result = await response.json();

      // Handle response
      if (result.error) {
        console.error(result.error);
        alert("Failed to create quiz: " + result.error); // Display error
      } else {
        alert("Quiz created successfully!");
        const quizID = result[0].QuizID;
        localStorage.setItem("QuizID", quizID);
        console.log("QuizID saved to localStorage:", quizID);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while creating the quiz."); // Display error
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Editor Controls */}
      <div className="w-1/4 ml-20 p-4 mt-6 bg-white border-r border-gray-300 rounded-xl shadow-lg">
        {/* Layout Selector */}
        <h1 className="text-2xl font-bold mb-4 text-black">
          Change the Question Layout
        </h1>

        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => handleLayoutChange("stacked")}
            className={`py-2 px-4 rounded-lg flex items-center gap-2 h-20 ${
              layout === "stacked"
                ? "bg-blue-500 text-white"
                : "bg-gray-300 text-black"
            } hover:bg-blue-400 transition duration-200 ease-in-out`}
          >
            <MdViewStream />
            Stacked
          </button>

          <button
            onClick={() => handleLayoutChange("corner")}
            className={`py-2 px-4 rounded-lg flex items-center gap-2 h-20 ${
              layout === "corner"
                ? "bg-blue-500 text-white"
                : "bg-gray-300 text-black"
            } hover:bg-blue-400 transition duration-200 ease-in-out`}
          >
            <MdViewModule />
            Corners
          </button>
          <button
            onClick={(e) => handleSubmit(e)}
            className="p-4 px-4 rounded-full flex items-center gap-2 mt-5 bg-blue-500"
           >
            Next
          </button>
        </div>
      </div>

      {/* Template Preview */}
      <div className="flex ml-52 p-4">
        {templates.map((template, index) => (
          <div key={index} className="mb-6">
            <TemplatePreview
              questions={[template.question]}
              answers={template.answers}
              layout={layout} // Pass layout to TemplatePreview
              buttonColor={buttonColor}
              backgroundColor={backgroundColor}
              buttonStyle={buttonStyle} // Pass buttonStyle to TemplatePreview
            />
          </div>
        ))}
      </div>
    </div>
  );
}
