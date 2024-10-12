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

  const [currentQuestion, setCurrentQuestion] = useState({});
  const [templates, setTemplates] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("templates")) || [];
    } catch (error) {
      console.error("Error accessing localStorage", error);
      return [];
    }
  });

  // Saving backgroundColor, buttonColor, buttonStyle, and templates to localStorage
  useEffect(() => {
    localStorage.setItem("backgroundColor", backgroundColor);
  }, [backgroundColor]);

  useEffect(() => {
    localStorage.setItem("buttonColor", buttonColor);
  }, [buttonColor]);

  useEffect(() => {
    localStorage.setItem("buttonStyle", buttonStyle);
  }, [buttonStyle]);

  useEffect(() => {
    localStorage.setItem("templates", JSON.stringify(templates));
  }, [templates]);

  // Handle the theme changes
  const handleThemeChange = (bgColour, btnColour, btnStyle, questions) => {
    setBackgroundColor(bgColour);
    setButtonColor(btnColour);
    setButtonStyle(btnStyle);
    setCurrentQuestion(questions[0]); // Set the first question
    setTemplates(questions); // Save the questions as templates
  };

  const options = [
    {
      bgColor: "pink",
      btnColor: "white",
      label: "Pink questionnaire",
      icon: <FiSun />,
      btnStyle: "style1",
      questions: [
        {
          question: "What is your favorite pink dessert?",
          answers: [
            "Cotton Candy",
            "Strawberry Cheesecake",
            "Raspberry Sorbet",
            "Pink Macarons",
          ],
        },
        {
          question: "Which pink drink do you prefer?",
          answers: [
            "Pink Lemonade",
            "Rose Tea",
            "Watermelon Juice",
            "Pink Champagne",
          ],
        },
      ],
    },
    {
      bgColor: "white",
      btnColor: "lightgray",
      label: "Italian questionnaire",
      icon: <FiMoon />,
      btnStyle: "style2",
      questions: [
        {
          question: "What is your favorite white cheese?",
          answers: ["Feta", "Mozzarella", "Ricotta", "Parmesan"],
        },
        {
          question: "What white wine do you enjoy?",
          answers: [
            "Chardonnay",
            "Sauvignon Blanc",
            "Pinot Grigio",
            "Riesling",
          ],
        },
      ],
    },
    {
      bgColor: "#F0CB83",
      btnColor: "white",
      label: "Cream questionnaire",
      icon: <FiDroplet />,
      btnStyle: "style3",
      questions: [
        {
          question: "What is your favorite creamy dish?",
          answers: [
            "Alfredo Pasta",
            "Creamy Risotto",
            "Cheesecake",
            "Panna Cotta",
          ],
        },
        {
          question: "What is your favorite cream-based drink?",
          answers: ["Milkshake", "Hot Chocolate", "Cream Soda", "Latte"],
        },
      ],
    },
    {
      bgColor: "lightblue",
      btnColor: "white",
      label: "Blue questionnaire",
      icon: <FiCloud />,
      btnStyle: "style4",
      questions: [
        {
          question: "What is your favorite seafood dish?",
          answers: ["Sushi", "Grilled Salmon", "Fish Tacos", "Clam Chowder"],
        },
        {
          question: "What is your favorite blue drink?",
          answers: [
            "Blue Lagoon",
            "Ocean Breeze",
            "Blueberry Smoothie",
            "Blue Curacao",
          ],
        },
      ],
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
                  handleThemeChange(
                    option.bgColor,
                    option.btnColor,
                    option.btnStyle,
                    option.questions
                  )
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
                    handleThemeChange(
                      option.bgColor,
                      option.btnColor,
                      option.btnStyle,
                      option.questions
                    )
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
          questions={currentQuestion.question || "Select a theme"}
          answers={currentQuestion.answers || []}
          buttonColor={buttonColor}
          backgroundColor={backgroundColor}
          layout={layout}
          buttonStyle={buttonStyle} // Pass button style to TemplatePreview
        />
      </div>
    </div>
  );
}
