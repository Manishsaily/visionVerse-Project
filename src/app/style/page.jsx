"use client";

import React, { useState, useEffect } from 'react';
import TemplatePreview from '../components/TemplatePreview';
import { FiSun, FiMoon, FiDroplet, FiCloud } from 'react-icons/fi';

export default function StylePage() {
  // Initialize background and button colors with values from localStorage or default values
  const [backgroundColor, setBackgroundColor] = useState(() => {
    try {
      return localStorage.getItem('backgroundColor') || 'white';
    } catch (error) {
      console.error('Error accessing localStorage', error);
      return 'white';
    }
  });

  const [buttonColor, setButtonColor] = useState(() => {
    try {
      return localStorage.getItem('buttonColor') || 'lightblue';
    } catch (error) {
      console.error('Error accessing localStorage', error);
      return 'lightblue';
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
      localStorage.setItem('backgroundColor', backgroundColor);
    } catch (error) {
      console.error('Error setting backgroundColor in localStorage', error);
    }
  }, [backgroundColor]);

  useEffect(() => {
    try {
      localStorage.setItem('buttonColor', buttonColor);
    } catch (error) {
      console.error('Error setting buttonColor in localStorage', error);
    }
  }, [buttonColor]);

  // Function to handle changing both background and button colors at once
  const handleColorChange = (bgColor, btnColor) => {
    setBackgroundColor(bgColor);
    setButtonColor(btnColor);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Style Controls */}
      <div className="w-1/4 ml-20 p-4 mt-6 bg-white border-r border-gray-300 rounded-xl shadow-lg">
        <h1 className="text-2xl font-bold mb-4">Change Theme:</h1>

        {/* Color Option Buttons */}
        <div className="mb-4">
          <button
            onClick={() => handleColorChange('pink', 'white')}
            className="w-full mb-2 p-3 flex items-center gap-2 rounded-full bg-pink-500 text-black hover:bg-pink-600 shadow-md"
          >
            <FiSun />
            Pink Background, White Buttons
          </button>
          <button
            onClick={() => handleColorChange('white', 'lightgray')}
            className="w-full mb-2 p-3 flex items-center gap-2 rounded-full bg-gray-300 text-black hover:bg-gray-400 shadow-md"
          >
            <FiMoon />
            White Background, Gray Buttons
          </button>
          <button
            onClick={() => handleColorChange('#F0CB83', 'white')}
            className="w-full mb-2 p-3 flex items-center gap-2 rounded-full bg-yellow-100 text-black hover:bg-yellow-200 shadow-md"
          >
            <FiDroplet />
            Cream Background, White Buttons
          </button>
          <button
            onClick={() => handleColorChange('lightblue', 'white')}
            className="w-full mb-2 p-3 flex items-center gap-2 rounded-full bg-blue-200 text-black hover:bg-blue-300 shadow-md"
          >
            <FiCloud />
            Light Blue Background, White Buttons
          </button>
        </div>
      </div>

      {/* Template Preview */}
      <div className="flex-1 p-4">
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
