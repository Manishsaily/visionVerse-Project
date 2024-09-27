"use client";

import React, { useState, useEffect } from "react";
import TemplatePreview from "../components/TemplatePreview";
import { FiImage, FiTrash, FiCheck, FiRefreshCw } from 'react-icons/fi';
import { AiOutlinePlus, AiOutlineQuestionCircle } from 'react-icons/ai';

export default function EditorPage() {
  
  const [templates, setTemplates] = useState(() => {
    try {
      const savedTemplates = localStorage.getItem("templates");
      return savedTemplates
        ? JSON.parse(savedTemplates)
        : [
            {
              question: "What is the Question?",
              answers: ["Answer 1", "Answer 2", "Answer 3", "Answer 4"],
              imageUrl: "",
            },
          ];
    } catch (error) {
      console.error("Error retrieving templates from localStorage", error);
      return [
        {
          question: "What is the Question?",
          answers: ["Answer 1", "Answer 2", "Answer 3", "Answer 4"],
          imageUrl: "",
        },
      ];
    }
  });

  const [islarge, setIsBig] = useState(false);

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

  // Save templates to localStorage when they change
  useEffect(() => {
    try {
      localStorage.setItem("templates", JSON.stringify(templates));
    } catch (error) {
      console.error("Error saving templates to localStorage", error);
    }
  }, [templates]);

  const handleQuestionChange = (index, userChange) => {
    const newTemplates = [...templates];
    newTemplates[index].question = userChange.target.value;
    setTemplates(newTemplates);
  };

  const handleAnswerChange = (templateIndex, answerIndex, userChange) => {
    const newTemplates = [...templates];
    newTemplates[templateIndex].answers[answerIndex] = userChange.target.value;
    setTemplates(newTemplates);
  };

  const addNewTemplate = () => {
    setTemplates([
      ...templates,
      {
        question: "What is the Question?",
        answers: ["Answer 1", "Answer 2", "Answer 3", "Answer 4"],
        imageUrl: "",
      },
    ]);
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

  const removeTemplate = (templateIndex) => {
    const newTemplates = [...templates];
    newTemplates.splice(templateIndex, 1);
    setTemplates(newTemplates);
  };

  const toggleSize = () => {
    setIsBig(!islarge);
  };

  // Reset Functionality
  const resetTemplatesAndLayout = () => {
    // Clear localStorage
    localStorage.removeItem("templates");
    localStorage.removeItem("layout");
    localStorage.removeItem("buttonColor");
    localStorage.removeItem("backgroundColor");

    // Reset state to default values
    setTemplates([
      {
        question: "What is the Question?",
        answers: ["Answer 1", "Answer 2", "Answer 3", "Answer 4"],
        imageUrl: "",
      },
    ]);

    setLayout("stacked");
    setIsBig(false); // Reset to small text
    setBackgroundColor("white")
    setButtonColor("lightblue")
  };

  // Handle submission of the questions to the backend
  const handleSubmit = async (e) => {
    e.preventDefault();

    const quizId = 1; // Replace with actual quiz ID

    const questionsToSubmit = templates
      .map((template) => ({
        questionText: template.question.trim() || "Default Question", // Ensure there's a value
        answers: template.answers.map(
          (answer) => answer.trim() || "Default Answer"
        ), // Ensure answers are filled
        quizId,
      }))
      .filter((q) => q.questionText); // Filter out empty questions if any

    if (questionsToSubmit.length === 0) {
      alert("No valid questions to submit.");
      return;
    }

    try {
      const response = await fetch("/api/questions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(questionsToSubmit), // Send the whole array
      });

      const result = await response.json();
      if (result.error) {
        console.error(result.error);
      } else {
        alert("Questions created successfully!");
        setTemplates([]); // Optionally reset the form or state
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

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

  {/* Progress Counter Array */}
  const [countNumbers, setCountNumbers] = useState ([]);
  const addNumber = () => {
    const newCountNumber = countNumbers[countNumbers.length - 1] + 1;
    setCountNumbers([...countNumbers, newCountNumber])
    console.log(addNumber)
  }

  return (
    <div className="flex min-h-full bg-gray-100">
    {/* Editor Controls */}
    <div className="w-1/4 ml-20 p-4 mt-6 bg-white border-r border-gray-300 rounded-xl shadow-lg">
      <form onSubmit={handleSubmit}>
        <div className="mb-4 flex justify-between items-center">
          <button
            type="button"
            onClick={toggleSize}
            className={`py-2 px-4 flex items-center gap-2 rounded-full shadow-md ${
              islarge ? "bg-gray-800 text-white" : "bg-gray-300 text-black"
            }`}
          >
            <AiOutlineQuestionCircle />
            {islarge ? "Text Large" : "Text Small"}
          </button>
        </div>

        {/* Image URL Inputs */}
        {templates.map((template, index) => (
          <div key={index} className="mb-4">
            <h1>Select a header image:</h1>
            <div className="flex items-center mb-2 mr-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <FiImage />
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(index, e)}
                  className="border rounded-full p-2 w-full"
                />
              </label>

              {template.imageUrl && (
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="ml-2 bg-red-500 text-white py-2 px-4 flex items-center gap-2 rounded-full hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
                >
                  <FiTrash />
                  Remove Image
                </button>
              )}
            </div>

            {template.imageUrl && (
              <img
                src={template.imageUrl}
                alt={`Uploaded Preview ${index}`}
                className="w-full h-32 object-cover rounded-lg mb-2"
              />
            )}
          </div>
        ))}

        <div className="mb-4 text-black">
          {templates.map((template, templateIndex) => (
            <div key={templateIndex} className="mb-6">
              <input
                type="text"
                value={template.question}
                onChange={(userChange) =>
                  handleQuestionChange(templateIndex, userChange)
                }
                className="w-full mb-2 text-xl p-3 border border-gray-300 rounded-full shadow-sm"
                placeholder={`Question ${templateIndex + 1}`}
              />

              {template.answers.map((answer, answerIndex) => (
                <input
                  key={answerIndex}
                  type="text"
                  value={answer}
                  onChange={(userChange) =>
                    handleAnswerChange(
                      templateIndex,
                      answerIndex,
                      userChange
                    )
                  }
                  className="w-full mb-2 text-xl p-3 border border-gray-300 rounded-full shadow-sm"
                  placeholder={`Answer ${answerIndex + 1}`}
                />
              ))}

              <button
                type="button"
                onClick={() => removeTemplate(templateIndex)}
                className="bg-red-500 text-white py-2 px-4 flex items-center gap-2 rounded-full hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
              >
                <FiTrash />
                Remove Question
              </button>
            </div>
          ))}

          <button
            type="button"
            onClick={() => {addNewTemplate(); addNumber();}}
            className="bg-green-500 text-white py-2 px-4 flex items-center gap-2 rounded-full hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
          >
            <AiOutlinePlus />
            Add Question
          </button>
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 flex items-center gap-2 rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <FiCheck />
          Submit Questions
        </button>

        {/* Reset Button */}
        <button
          type="button"
          onClick={resetTemplatesAndLayout}
          className="mt-4 bg-yellow-500 text-white py-2 px-4 flex items-center gap-2 rounded-full hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
        >
          <FiRefreshCw />
          Reset
        </button>
      </form>
    </div>

    {/* Template Preview */}
    <div className="flex-1 p-4">
      {templates.map((template, index) => (
        <div key={index} className="mb-6">
          <TemplatePreview
            questions={[template.question]}
            answers={template.answers}
            islarge={islarge}
            layout={layout}
            imageUrl={template.imageUrl}
            buttonColor={buttonColor}
            backgroundColor={backgroundColor}
          />
        </div>
      ))}
    </div>
  </div>
  );
}
