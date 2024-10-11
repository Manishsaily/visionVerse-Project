import React from "react";
import {
  TbCircleLetterA,
  TbCircleLetterB,
  TbCircleLetterC,
  TbCircleLetterD,
} from "react-icons/tb";

export default function TemplatePreview({
  questions,
  answers,
  isLarge,
  layout,
  imageUrl,
  buttonColor,
  backgroundColor,
  buttonStyle,
  currentTemplateIndex = 0, // Default value
  totalTemplates = 1, // Default value
  onAnswerSelect,
}) {
  // Define the button style with the question container
  const getStyledContainer = () => {
    return (
      <div
        className={`flex flex-col items-center gap-20 p-12 px-4 rounded-lg ${
          layout === "stacked" ? "-mt-8" : ""
        }`} // Add margin-top for stacked layout
        style={{ backgroundColor: buttonColor, borderRadius: "20px" }}
      >
        <p className={`${isLarge ? "text-2xl" : "text-lg"} mb-4 text-center`}>
          {questions}
        </p>
        <div
          className={`grid ${layout === "stacked" ? "grid-cols-1" : "grid-cols-2"} gap-4 w-full`}
        >
          {answers.map((answer, idx) => (
            <div className="flex justify-center" key={idx}>
              {getButtonStyle(answer, idx)}
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  // Define different button styles with responsive sizing
  const getButtonStyle = (answer, index) => {
    // Base styles for button size
    const buttonBaseStyle = "w-full h-16 flex items-center justify-center rounded-lg focus:outline-none focus:ring-2 text-lg overflow-hidden whitespace-nowrap text-ellipsis";
  
    switch (buttonStyle) {
      case "style1":
        return (
          <button
            key={index}
            onClick={() => onAnswerSelect(index)}
            className={`${buttonBaseStyle} border-2 border-blue-500 text-black`}
            style={{ backgroundColor: "white" }}
          >
            <span className="mr-2">
              {index === 0 ? (
                <TbCircleLetterA />
              ) : index === 1 ? (
                <TbCircleLetterB />
              ) : index === 2 ? (
                <TbCircleLetterC />
              ) : (
                <TbCircleLetterD />
              )}
            </span>
            {answer}
          </button>
        );
      case "style2":
        return (
          <button
            key={index}
            onClick={() => onAnswerSelect(index)}
            className={`${buttonBaseStyle} border-2 border-white text-black`}
            style={{ backgroundColor: "lightgray" }}
          >
            {answer}
          </button>
        );
      case "style3":
        return (
          <button
            key={index}
            onClick={() => onAnswerSelect(index)}
            className={`${buttonBaseStyle} border-2 border-black bg-white text-black`}
          >
            {answer}
          </button>
        );
      case "style4":
        return (
          <button
            key={index}
            onClick={() => onAnswerSelect(index)}
            className={`${buttonBaseStyle} bg-gray-700 text-white`}
          >
            {answer}
          </button>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      {/* Phone Screen Container */}
      <div className="w-[375px] h-[800px] bg-black border rounded-[40px] overflow-hidden shadow-lg">
        <div
          className="h-full rounded-[40px] overflow-hidden"
          style={{ backgroundColor }}
        >
          {/* Progress Bar Container */}
          <div className="w-full px-4 py-2 mt-6">
            <div className="bg-gray-200 rounded-full h-6 relative">
              <div
                className="bg-blue-600 rounded-full"
                style={{
                  width: `${
                    ((currentTemplateIndex + 1) / totalTemplates) * 100
                  }%`, // Dynamic width based on current question
                  height: "100%",
                }}
              >
                <span className="text-black text-xs font-semibold absolute left-1/2 -translate-x-1/2 top-1/2 transform -translate-y-1/2">
                  {currentTemplateIndex + 1} of {totalTemplates}
                </span>
              </div>
            </div>
          </div>

          {/* Quiz Content */}
          <div className={`p-8 ${imageUrl ? "mt-24" : "mt-52"}`}>
            {/* Render styled containers for questions and answers */}
            {getStyledContainer()}
          </div>
        </div>
      </div>
    </div>
  );
}
