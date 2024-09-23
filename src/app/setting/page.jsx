"use client";

import React, { useState, useEffect } from "react";
import TemplatePreview from "../components/TemplatePreview";

export default function EditorPage() {
  const [templates, setTemplates] = useState([
    {
      question: "What is the Question?",
      answers: ["Answer 1", "Answer 2", "Answer 3", "Answer 4"],
    },
  ]);
  const [islarge, setIsBig] = useState();

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
      },
    ]);
  };

  const removeTemplate = (templateIndex) => {
    const newTemplates = [...templates];
    newTemplates.splice(templateIndex, 1);
    setTemplates(newTemplates);
  };

  const toggleSize = () => {
    setIsBig(!islarge);
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

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Editor Controls */}
      <div className="w-1/3 p-4 bg-white border-r border-gray-300 rounded-xl">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <button
              type="button"
              onClick={toggleSize}
              className={`py-2 px-4 rounded-lg ${
                islarge ? "bg-gray-800 text-white" : "bg-gray-300 text-black"
              }`}
            >
              {islarge ? "Text Large" : "Text Small"}
            </button>
          </div>

          <div className="mb-4 text-black">
            {templates.map((template, templateIndex) => (
              <div key={templateIndex} className="mb-6">
                <input
                  type="text"
                  value={template.question}
                  onChange={(userChange) =>
                    handleQuestionChange(templateIndex, userChange)
                  }
                  className="w-full mb-2 text-xl p-2 border border-gray-300 rounded-lg"
                  placeholder={`Question ${templateIndex + 1}`}
                />

                {template.answers.map((answer, answerIndex) => (
                  <input
                    key={answerIndex}
                    type="text"
                    value={answer}
                    onChange={(userChange) =>
                      handleAnswerChange(templateIndex, answerIndex, userChange)
                    }
                    className="w-full mb-2 text-xl p-2 border border-gray-300 rounded-lg"
                    placeholder={`Answer ${answerIndex + 1}`}
                  />
                ))}

                <button
                  type="button"
                  onClick={() => removeTemplate(templateIndex)}
                  className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
                >
                  Remove Question
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addNewTemplate}
              className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
            >
              Add Question
            </button>
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Submit Questions
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
            />
          </div>
        ))}
      </div>
    </div>
  );
}
