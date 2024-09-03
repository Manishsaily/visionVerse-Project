import React from 'react';

export default function TemplatePreview({ questions, answers, isBold, layout }) {

  return (
    <div className="w-full max-w-md ml-64 p-4 bg-white rounded-lg shadow-lg">
      {/* Phone Screen Container */}
      <div className="relative w-full h-[725px] mx-auto border border-gray-300 rounded-lg overflow-hidden">
        {/* Image at the Top */}
        <img 
          src="" 
          alt="Quiz Image" 
          className="w-full h-1/3 object-cover" 
        />

        {/* Quiz Content */}
        <div className="p-4 mt-24">
          {/* Display Question with  Bold Styling */}
          {questions.map((question, index) => (
            <p key={index} className={`mb-4 ${isBold ? 'font-bold' : ''}`}>
              {question}
            </p>
          ))}

          {/* Display Answer Buttons with Different Layouts */}
          <div className={`flex ${layout === 'stacked' ? 'flex-col space-y-2' : ''} ${layout === 'corner' ? 'grid grid-cols-2 grid-rows-2 gap-2' : ''}`}>
            {answers.map((answer, index) => (
              <button
                key={index}
                className= "bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                {answer}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

