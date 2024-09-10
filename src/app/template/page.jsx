"use client";

import React, { useState, useEffect } from 'react';
import TemplatePreview from '../components/TemplatePreview';

export default function TemplatePage() {
  const [templates] = useState([
    {
      question: 'What is the Question?',
      answers: ['Answer 1', 'Answer 2', 'Answer 3', 'Answer 4'],
    },
  ]);

  // Initialize layout state with localStorage or default to 'stacked'
  const [layout, setLayout] = useState(() => {
    try {
      return localStorage.getItem('layout') || 'stacked';
    } catch (error) {
      console.error('Error accessing localStorage', error);
      return 'stacked';
    }
  });

  // Handle layout change and update both state and localStorage
  const handleLayoutChange = (newLayout) => {
    setLayout(newLayout);
    try {
      localStorage.setItem('layout', newLayout);
    } catch (error) {
      console.error('Error setting localStorage', error);
    }
  };

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

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Editor Controls */}
      <div className="w-1/3 p-4 bg-white border-r border-gray-300 rounded-xl">

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
      </div>

      {/* Template Preview */}
      <div className="flex-1 p-4">
        {templates.map((template, index) => (
          <div key={index} className="mb-6">
            <TemplatePreview
              questions={[template.question]}
              answers={template.answers}
              layout={layout} // Pass layout to TemplatePreview
            />
          </div>
        ))}
      </div>
    </div>
  );
}
