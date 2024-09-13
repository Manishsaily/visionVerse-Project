"use client";

import React, { useState, useEffect } from 'react';
import TemplatePreview from '../components/TemplatePreview';

export default function EditorPage() {
  const [templates, setTemplates] = useState([
    {
      question: 'What is the Question?',
      answers: ['Answer 1', 'Answer 2', 'Answer 3', 'Answer 4'],
    },
  ]);
  const [islarge, setIsBig] = useState();

  // Initialize layout state with localStorage or default to 'stacked'
  const [layout, setLayout] = useState(() => {
    try {
      return localStorage.getItem('layout') || 'stacked';
    } catch (error) {
      console.error('Error accessing localStorage', error);
      return 'stacked';
    }
  });

  // Effect to sync layout changes across tabs
  useEffect(() => {
    const syncLayoutAcrossTabs = (event) => {
      if (event.key === 'layout') {
        setLayout(event.newValue);
      }
    };

    // Listen for the storage event to sync changes
    window.addEventListener('storage', syncLayoutAcrossTabs);

    // Cleanup the event listener when the component unmounts
    return () => {
      window.removeEventListener('storage', syncLayoutAcrossTabs);
    };
  }, []);

  // Handle change for a question in a specific template
  const handleQuestionChange = (index, userChange) => {
    const newTemplates = [...templates];
    newTemplates[index].question = userChange.target.value;
    setTemplates(newTemplates);
  };

  // Handle change for an answer in a specific template
  const handleAnswerChange = (templateIndex, answerIndex, userChange) => {
    const newTemplates = [...templates];
    newTemplates[templateIndex].answers[answerIndex] = userChange.target.value;
    setTemplates(newTemplates);
  };

  // Duplicate the current template
  const addNewTemplate = () => {
    setTemplates([
      ...templates,
      {
        question: 'What is the Question?',
        answers: ['Answer 1', 'Answer 2', 'Answer 3', 'Answer 4'],
      },
    ]);
  };

  // Remove a question template
  const removeTemplate = (templateIndex) => {
    const newTemplates = [...templates];
    newTemplates.splice(templateIndex, 1);
    setTemplates(newTemplates);
  };

  // Toggle text size
  const toggleSize = () => {
    setIsBig(!islarge);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Editor Controls */}
      <div className="w-1/3 p-4 bg-white border-r border-gray-300 rounded-xl">
        <div className="mb-4">
          {/* Text Formatting Controls */}
          <button
            onClick={toggleSize}
            className={`py-2 px-4 rounded-lg ${islarge ? 'bg-gray-800 text-white' : 'bg-gray-300 text-black'}`}
          >
            {islarge ? 'Text Large' : 'Text Small'}
          </button>
        </div>

        {/* Templates Controls */}
        <div className="mb-4">
          {templates.map((template, templateIndex) => (
            <div key={templateIndex} className="mb-6">
              {/* Text Box for Question */}
              <input
                type="text"
                value={template.question}
                onChange={(userChange) => handleQuestionChange(templateIndex, userChange)}
                className="w-full mb-2 text-xl p-2 border border-gray-300 rounded-lg"
                placeholder={`Question ${templateIndex}`}
              />

              {/* Text Boxes for Answers */}
              {template.answers.map((answer, answerIndex) => (
                <input
                  key={answerIndex}
                  type="text"
                  value={answer}
                  onChange={(userChange) => handleAnswerChange(templateIndex, answerIndex, userChange)}
                  className="w-full mb-2 text-xl p-2 border border-gray-300 rounded-lg"
                  placeholder={`Answer ${answerIndex + 1}`}
                />
              ))}

              {/* Remove Button */}
              <button
                onClick={() => removeTemplate(templateIndex)}
                className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
              >
                Remove Question
              </button>
            </div>
          ))}
          <button
            onClick={addNewTemplate}
            className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
          >
            Add Question
          </button>
        </div>
      </div>

      {/* Template Preview */}
      <div className="flex-1 p-4">
        {templates.map((template, index) => (
          <div key={index} className="mb-6">
            <TemplatePreview
              questions={[template.question]}
              answers={template.answers}
              islarge={islarge}
              layout={layout} // Pass layout to TemplatePreview
            />
          </div>
        ))}
      </div>
    </div>
  );
}

