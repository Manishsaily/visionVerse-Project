"use client";

import React, { useState, useEffect } from "react";
import TemplatePreview from "../components/TemplatePreview";
import { MdViewStream, MdViewModule } from "react-icons/md";
import { RightNavbar } from "../components/RightBar";

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
      <div className="w-1/6 ml-auto p-4 bg-white border-l border-gray-300 shadow-xl">
        <RightNavbar />
      </div>
    </div>
  );
}
