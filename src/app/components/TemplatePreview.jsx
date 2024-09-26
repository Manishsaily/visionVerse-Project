import React from 'react';

export default function TemplatePreview({ questions, answers, isLarge, layout, imageUrl, buttonColor, backgroundColor }) {
  return (
    <div className="max-w-md ml-64 p-4">
      {/* Phone Screen Container */}
      <div className="relative w-[375px] h-[812px] mx-auto bg-black border rounded-[40px] overflow-hidden">
        {/* Notch */}
        <div className="absolute top-0 left-0 w-full h-6 bg-black z-10"></div>
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-36 h-6 bg-gray-800 rounded-b-lg"></div>
        
        {/* Phone Body */}
        <div 
          className="relative w-full h-full rounded-[35px] overflow-hidden"
          style={{ backgroundColor }}  // Apply background color to the inner phone body
        >
          {/* Conditionally Render Image */}
          {imageUrl && (
            <img 
              src={imageUrl} 
              alt="Quiz Image" 
              className="w-full h-1/3 object-contain p-4 mt-8 rounded-xlg" 
            />
          )}

          {/* Quiz Content */}
          <div className={`p-4 ${imageUrl ? 'mt-24' : 'mt-8'}`}>
            {questions.map((question, index) => (
              <p key={index} className={`mb-4 ${isLarge ? 'text-2xl' : 'text-lg'}`}>
                {question}
              </p>
            ))}

            {/* Display Answer Buttons with Different Layouts */}
            <div className={`flex ${layout === 'stacked' ? 'flex-col space-y-2' : ''} ${layout === 'corner' ? 'grid grid-cols-2 grid-rows-2 gap-2' : ''}`}>
              {answers.map((answer, index) => (
                <button
                  key={index}
                  className="text-black py-2 px-4 rounded-lg focus:outline-none focus:ring-2 hover:bg-opacity-80"
                  style={{ backgroundColor: buttonColor }}  // Use inline style for button color
                >
                  {answer}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
