"use client";

import React, { useState, useEffect } from "react";
import TemplatePreview from "../components/TemplatePreview";
import { FiSun, FiMoon, FiDroplet, FiCloud } from "react-icons/fi";

export default function StylePage() {
  // Initialize background and button colors with values from localStorage or default values
  const [backgroundColor, setBackgroundColor] = useState(() => {
    try {
      return localStorage.getItem("backgroundColor") || "white";
    } catch (error) {
      console.error("Error accessing localStorage", error);
      return "white";
    }
  });

  const [buttonColor, setButtonColor] = useState(() => {
    try {
      return localStorage.getItem("buttonColor") || "lightblue";
    } catch (error) {
      console.error("Error accessing localStorage", error);
      return "lightblue";
    }
  });

  // Layout state
  const [layout, setLayout] = useState(() => {
    try {
      return localStorage.getItem("layout") || "stacked";
    } catch (error) {
      console.error("Error accessing localStorage", error);
      return "stacked";
    }
  });

  useEffect(() => {
    const syncLayoutAcrossTabs = (event) => {
      if (event.key === "layout") {
        setLayout(event.newValue);
      }
    };

    window.addEventListener("storage", syncLayoutAcrossTabs);
    return () => {
      window.removeEventListener("storage", syncLayoutAcrossTabs);
    };
  }, []);

  // Save background color and button color to localStorage whenever they change
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

  // Function to handle changing both background and button colors at once
  const handleColorChange = (bgColor, btnColor) => {
    setBackgroundColor(bgColor);
    setButtonColor(btnColor);
  };

  const options = [
    {
      bgColor: "pink",
      btnColor: "white",
      label: "Pink Background, White Buttons",
      icon: <FiSun />,
    },
    {
      bgColor: "white",
      btnColor: "lightgray",
      label: "White Background, Gray Buttons",
      icon: <FiMoon />,
    },
    {
      bgColor: "#F0CB83",
      btnColor: "white",
      label: "Cream Background, White Buttons",
      icon: <FiDroplet />,
    },
    {
      bgColor: "lightblue",
      btnColor: "white",
      label: "Light Blue Background, White Buttons",
      icon: <FiCloud />,
    },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Style Controls */}
      <div className="w-1/4 ml-20 p-4 mt-6 bg-white border-r border-gray-300 rounded-xl shadow-lg">
        <h1 className="text-2xl font-bold mb-4 text-black">Change Theme:</h1>

        {/* Color Option Buttons */}
        <div className="grid grid-cols-2 gap-4">
          {options.map((option, index) => (
            <div key={index} className="flex flex-col items-center">
              <button
                onClick={() =>
                  handleColorChange(option.bgColor, option.btnColor)
                }
                className={`p-4 flex items-center gap-2 rounded-3xl text-black hover:shadow-lg shadow-md`}
                style={{
                  height: "400px",
                  width: "100%",
                  backgroundColor: option.bgColor,
                }}
              >
                {option.icon}
                {option.label}
              </button>
              <div className="flex justify-center mt-2">
                <input
                  type="radio"
                  name="colorOptions"
                  checked={backgroundColor === option.bgColor}
                  onChange={() =>
                    handleColorChange(option.bgColor, option.btnColor)
                  }
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Template Preview */}
      <div className="flex-1 flex justify-center items-center">
        <TemplatePreview
          questions={["What is the Question?"]}
          answers={["Answer 1", "Answer 2", "Answer 3", "Answer 4"]}
          buttonColor={buttonColor}
          backgroundColor={backgroundColor}
          layout={layout}
        />
      </div>
    </div>
  );
}
