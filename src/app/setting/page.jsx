"use client";

import React, { useState } from 'react';
import TemplatePreview from '../components/TemplatePreview';

export default function EditorPage() {
  const [templates, setTemplates] = useState([
    {
      question: 'What is the Question?',
      answers: ['Answer 1', 'Answer 2', 'Answer 3', 'Answer 4'],
    },
  ]);
  const [isBold, setIsBold] = useState(false);
  const [layout, setLayout] = useState('stacked'); // Default layout

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
        question: 'What is the correct answer?',
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

  // Toggle text boldness
  const toggleBold = () => {
    setIsBold(!isBold);
  };

  // Handle layout change
  const handleLayoutChange = (newLayout) => {
    setLayout(newLayout);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Editor Controls */}
      <div className="w-1/3 p-4 bg-white border-r border-gray-300">
        <div className="mb-4">
          {/* Text Formatting Controls */}
          <button
            onClick={toggleBold}
            className={`py-2 px-4 rounded-lg ${isBold ? 'bg-gray-800 text-white' : 'bg-gray-300 text-black'}`}
          >
            {isBold ? 'Bold On' : 'Bold Off'}
          </button>
        </div>

        {/* Layout Selector */}
        <h1>Change the Question Layout</h1>
        <div className="mb-4">
          <button
            onClick={() => handleLayoutChange('stacked')}
            className={`py-2 px-4 rounded-lg mr-2 ${layout === 'stacked' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'}`}
          >
            Stacked
          </button>
          <button
            onClick={() => handleLayoutChange('corner')}
            className={`py-2 px-4 rounded-lg ${layout === 'corner' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'}`}
          >
            Corners
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
                placeholder={`Question ${templateIndex + 1}`}
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
              isBold={isBold}
              layout={layout} // Pass layout to TemplatePreview
            />
          </div>
        ))}
      </div>
    </div>
  );
}
