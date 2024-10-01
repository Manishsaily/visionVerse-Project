"use client";

import React, { useState, useEffect } from "react";
import TemplatePreview from "../components/TemplatePreview";
import {
  FiImage,
  FiTrash,
  FiCheck,
  FiRefreshCw,
  FiType,
  FiMinus,
  FiPlus,
} from "react-icons/fi";
import { AiOutlinePlus, AiOutlineQuestionCircle } from "react-icons/ai";

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
  useEffect(() => {
    try {
      localStorage.setItem("isLarge", JSON.stringify(islarge));
    } catch (error) {
      console.error("Error saving islarge to localStorage", error);
    }
  }, [islarge]);

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
    setTemplates((prevTemplates) => {
      const newTemplates = [
        ...prevTemplates,
        {
          question: "What is the Question?",
          answers: ["Answer 1", "Answer 2", "Answer 3", "Answer 4"],
          imageUrl: "",
        },
      ];
      // Update counts to match the new templates
      setCounts((prevCounts) => [
        ...prevCounts,
        Array(4).fill(0), // Add a new count array for the new template
      ]);
      return newTemplates;
    });
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
    setTemplates((prevTemplates) => {
      const newTemplates = [...prevTemplates];
      newTemplates.splice(templateIndex, 1);

      // Update counts accordingly
      setCounts((prevCounts) => {
        const newCounts = [...prevCounts];
        newCounts.splice(templateIndex, 1); // Remove the corresponding counts
        return newCounts;
      });

      return newTemplates;
    });
  };

  // Reset Functionality
  const resetTemplatesAndLayout = () => {
    // Clear localStorage
    localStorage.removeItem("templates");
    localStorage.removeItem("layout");
    localStorage.removeItem("buttonColor");
    localStorage.removeItem("backgroundColor");
    localStorage.removeItem("isLarge");
    localStorage.removeItem("QuizID");
    setCounts([Array(4).fill(0)]);

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
    setBackgroundColor("white");
    setButtonColor("lightblue");
  };

  // Handle submission of the questions to the backend
  const handleSubmit = async (e) => {
    e.preventDefault();

    const quizId = localStorage.getItem("QuizID"); // Retrieve the Quiz ID from local storage

    if (!quizId) {
      alert("Quiz ID is required to submit questions.");
      return;
    }

    const questionsToSubmit = templates
      .map((template) => ({
        questionText: template.question.trim() || "Default Question",
        answers: template.answers.map(
          (answer) => answer.trim() || "Default Answer"
        ),
        quizId: parseInt(quizId, 10), // Ensure quizId is an integer
      }))
      .filter((q) => q.questionText);

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
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

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

  const toggleSize = () => {
    setIsBig(!islarge);
  };

  // Add a state to track counts for each answer
  const [counts, setCounts] = useState(() => {
    return templates.map(() => Array(4).fill(0)); // Initialize counters to 0 for each answer
  });

  // Function to increment the counter
  const incrementCount = (templateIndex, answerIndex) => {
    const newCounts = [...counts];
    newCounts[templateIndex][answerIndex] += 1;
    setCounts(newCounts);
  };

  // Function to decrement the counter
  const decrementCount = (templateIndex, answerIndex) => {
    const newCounts = [...counts];
    if (newCounts[templateIndex][answerIndex] > 0) {
      newCounts[templateIndex][answerIndex] -= 1;
    }
    setCounts(newCounts);
  };

  return (
    <div className="flex min-h-full bg-gray-100 text-black">
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
          {/* Questions and Image Uploads */}
          {templates.map((template, templateIndex) => (
            <div
              key={templateIndex}
              className="flex mb-6 bg-white rounded-lg shadow-md"
            >
              <div className="mr-5 bg-gray-200 p-5 flex flex-col space-y-2">
                {" "}
                {/* Use flex-col for vertical stacking */}
                <button
                  type="button" // Ensure this is a button element
                  onClick={() => {
                    addNewTemplate();
                  }}
                >
                  <AiOutlinePlus size={20} />
                </button>
                <button
                  type="button"
                  onClick={() => removeTemplate(templateIndex)}
                  className="pt-4"
                >
                  <FiTrash size={20} />
                </button>
              </div>

              {/* Template Content */}
              <div className="flex-1 m-3">
                {/* Question Input */}
                <div className="flex items-center">
                  <FiType />
                  <input
                    type="text"
                    value={template.question}
                    onChange={(userChange) =>
                      handleQuestionChange(templateIndex, userChange)
                    }
                    className="w-full mb-2 text-xl p-3 border border-gray-300 rounded-full shadow-sm ml-2"
                    placeholder={`Question ${templateIndex + 1}`}
                  />
                </div>

                {/* Image Upload Section */}
                <h1>Select a header image:</h1>
                <div className="flex items-center mb-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <FiImage />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(templateIndex, e)}
                      className="border rounded-full p-2 w-full"
                    />
                  </label>

                  {template.imageUrl && (
                    <button
                      type="button"
                      onClick={() => removeImage(templateIndex)}
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
                    alt={`Uploaded Preview ${templateIndex}`}
                    className="w-full h-32 object-cover rounded-lg mb-2"
                  />
                )}

                {/* Answer Inputs */}
                {template.answers.map((answer, answerIndex) => (
                  <div key={answerIndex} className="flex items-center mb-2">
                    <input
                      type="text"
                      value={answer}
                      onChange={(userChange) =>
                        handleAnswerChange(
                          templateIndex,
                          answerIndex,
                          userChange
                        )
                      }
                      className="flex-1 text-xl p-3 border border-gray-300 rounded-full shadow-sm"
                      placeholder={`Answer ${answerIndex + 1}`}
                    />
                    <div className="flex items-center ml-2">
                      <button
                        type="button"
                        onClick={() =>
                          decrementCount(templateIndex, answerIndex)
                        }
                      >
                        <FiMinus />
                      </button>
                      <span className="mx-2">
                        {counts[templateIndex][answerIndex]}
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          incrementCount(templateIndex, answerIndex)
                        }
                      >
                        <FiPlus />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
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
