import React from "react";

export default function TemplatePreview({
  questions,
  answers,
  isLarge,
  layout,
  imageUrl,
  buttonColor,
  backgroundColor,
  size = "large", // New size prop with default value
}) {
  // Determine size classes and dimensions based on the size prop
  const textSize = size === "small" ? "text-xs" : "text-2xl";
  const answerSize =
    size === "small" ? "py-1 px-2 text-xs" : "py-2 px-4 text-lg";
  const borderRadius = size === "small" ? "rounded-md" : "rounded-[40px]"; // Adjusted for small size
  const templateDimensions =
    size === "small" ? "w-[100px] h-[200px]" : "w-[375px] h-[812px]";
  const marginTop = size === "small" ? "mt-1" : "mt-4";

  return (
    <div className={`max-w-md`}>
      {/* Phone Screen Container */}
      <div
        className={`relative ${templateDimensions} mx-auto bg-black border ${borderRadius} overflow-hidden`}
      >
        {/* Notch */}
        <div className="absolute top-0 left-0 w-full h-6 bg-black z-10"></div>
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-36 h-6 bg-gray-800 rounded-b-lg"></div>

        {/* Phone Body */}
        <div
          className={`relative w-full h-full overflow-hidden ${borderRadius}`}
          style={{ backgroundColor }} // Apply background color to the inner phone body
        >
          {/* Conditionally Render Image or Empty Box */}
          {imageUrl ? (
            <img
              src={imageUrl}
              alt="Quiz Image"
              className={`w-full h-1/3 object-contain p-4 ${borderRadius}`}
            />
          ) : (
            <div
              className={`w-full h-1/3 bg-gray-200 flex items-center justify-center p-4 mt-8 ${borderRadius}`}
            >
              <p className="text-gray-500">No Image Available</p>
            </div>
          )}

          {/* Quiz Content */}
          <div className={`p-4 ${marginTop}`}>
            {questions.map((question, index) => (
              <p key={index} className={`mb-4 ${textSize}`}>
                {question}
              </p>
            ))}

            {/* Display Answer Buttons with Different Layouts */}
            <div
              className={`flex ${
                layout === "stacked" ? "flex-col space-y-2" : ""
              } ${
                layout === "corner" ? "grid grid-cols-2 grid-rows-2 gap-2" : ""
              }`}
            >
              {answers.map((answer, index) => (
                <button
                  key={index}
                  className={`text-black ${answerSize} ${borderRadius} focus:outline-none focus:ring-2 hover:bg-opacity-80`}
                  style={{ backgroundColor: buttonColor }}
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
