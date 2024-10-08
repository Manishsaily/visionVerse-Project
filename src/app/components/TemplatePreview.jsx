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
          className={`flex ${
            layout === "stacked"
              ? "flex-col space-y-2"
              : "grid grid-cols-2 gap-2"
          }`}
        >
          {answers.map((answer, idx) => (
            <div className={layout === "corner" ? "w-full" : ""} key={idx}>
              {getButtonStyle(answer, idx, layout)}
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Define different button styles
  const getButtonStyle = (answer, index) => {
    switch (buttonStyle) {
      case "style1":
        return (
          <button
            key={index}
            onClick={() => onAnswerSelect(index)}
            className="flex items-center justify-start py-4 px-2 rounded-full border-2 border-blue-500 text-black focus:outline-none focus:ring-2 text-lg"
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
            className="py-4 px-6 rounded-lg border-2 border-white focus:outline-none focus:ring-2 text-lg text-black"
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
            className="py-4 px-6 rounded-lg border-2 border-black bg-white text-black focus:outline-none focus:ring-2 text-lg"
          >
            {answer}
          </button>
        );
      case "style4":
        return (
          <button
            key={index}
            onClick={() => onAnswerSelect(index)}
            className="py-4 px-6 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 text-lg"
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
