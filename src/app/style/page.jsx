"use client";

import React, { useState, useEffect } from "react";
import TemplatePreview from "../components/TemplatePreview";
import { FiSun, FiMoon, FiDroplet, FiCloud } from "react-icons/fi";


export default function StylePage() {
  // State initialization with localStorage fallback
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

  const [layout] = useState(() => {
    try {
      return localStorage.getItem("layout") || "stacked";
    } catch (error) {
      console.error("Error accessing localStorage", error);
      return "stacked";
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

  // Saving backgroundColor, buttonColor, and buttonStyle to localStorage
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

  // Handle the theme changes
  const handleThemeChange = (bgColour, btnColour, btnStyle) => {
    setBackgroundColor(bgColour);
    setButtonColor(btnColour);
    setButtonStyle(btnStyle);
  };

  const options = [
    {
      bgColor: "pink",
      btnColor: "white",
      label: "Pink Background, White Buttons",
      icon: <FiSun />,
      btnStyle: "style1",
    },
    {
      bgColor: "white",
      btnColor: "lightgray",
      label: "White Background, Gray Buttons",
      icon: <FiMoon />,
      btnStyle: "style2",
    },
    {
      bgColor: "#F0CB83",
      btnColor: "white",
      label: "Cream Background, White Buttons",
      icon: <FiDroplet />,
      btnStyle: "style3",
    },
    {
      bgColor: "lightblue",
      btnColor: "white",
      label: "Light Blue Background, White Buttons",
      icon: <FiCloud />,
      btnStyle: "style4",
    },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Style Controls */}
      <div className="w-1/4 ml-20 p-4 mt-6 bg-white border-r border-gray-300 rounded-xl shadow-lg">
        <h1 className="text-2xl font-bold mb-4 text-black">Change Theme:</h1>

        {/* Theme Option Buttons */}
        <div className="grid grid-cols-2 gap-4">
          {options.map((option, index) => (
            <div key={index} className="flex flex-col items-center">
              <button
                onClick={() =>
                  handleThemeChange(option.bgColor, option.btnColor, option.btnStyle)
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
              {/* Highlighting the selected theme */}
              <div className="flex justify-center mt-2">
                <input
                  type="radio"
                  name="themeOptions"
                  checked={
                    backgroundColor === option.bgColor &&
                    buttonColor === option.btnColor &&
                    buttonStyle === option.btnStyle
                  }
                  onChange={() =>
                    handleThemeChange(option.bgColor, option.btnColor, option.btnStyle)
                  }
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Template Preview */}
      <div className="flex ml-52 p-4">
        <TemplatePreview
          questions={["What is the Question?"]}
          answers={["Answer 1", "Answer 2", "Answer 3", "Answer 4"]}
          buttonColor={buttonColor}
          backgroundColor={backgroundColor}
          layout={layout}
          buttonStyle={buttonStyle} // Pass button style to TemplatePreview
        />
      </div>
    </div>
  );
}
