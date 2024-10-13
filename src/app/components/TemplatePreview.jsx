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
    const containerHeight =
      buttonStyle === "style2" ? "h-2/3" : "h-auto"; // Set height to 2/3 for style2

    return (
      <div
        className={`flex flex-col items-center justify-center p-6 px-4 rounded-lg ${layout === "stacked" ? "-mt-48" : "-mt-48"} ${containerHeight}`}
        style={{
          backgroundColor: buttonStyle === "style2" ? "white" : buttonColor,
          borderRadius: "20px",
        }}
      >
        <p className={`${isLarge ? "text-2xl" : "text-lg"} mb-4 text-center text-black`}>
          {questions}
        </p>
        <div className={`grid ${layout === "stacked" ? "grid-cols-1" : "grid-cols-2"} gap-4 w-full`}>
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
    const buttonBaseStyle =
      "w-full h-16 flex items-center justify-center rounded-lg focus:outline-none focus:ring-2 text-lg overflow-hidden whitespace-nowrap text-ellipsis";

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

  const renderLargeNumberProgress = () => {
    return (
      <div className="flex justify-center items-center h-full mr-52">
        <span className="text-6xl font-bold text-blue-600">
          {currentTemplateIndex + 1}
        </span>
        <span className="text-2xl text-gray-600 ml-2">/ {totalTemplates}</span>
      </div>
    );
  };

  // Render progress circles for style2
  const renderProgressCircles = () => {
    return (
      <div className="flex justify-center items-center gap-2 mt-16">
        {Array.from({ length: totalTemplates }, (_, idx) => (
          <div
            key={idx}
            className={`w-11 h-11 rounded-full flex justify-center items-center border-2 ${
              idx === currentTemplateIndex ? "bg-orange-600 text-white" : "border-orange-600"
            }`}
          >
            {idx === currentTemplateIndex && (
              <span className="text-lg font-semibold">{currentTemplateIndex + 1}</span>
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div>
      {/* Phone Screen Container */}
      <div className="w-[375px] h-[800px] bg-black border rounded-[40px] overflow-hidden shadow-lg">
        <div className="h-full rounded-[40px] overflow-hidden relative" style={{ backgroundColor }}>
         {/* Progress Bar Container */}
         <div
            className={`w-full px-4 py-2 ${
              buttonStyle === "style2" ? "bg-gray-400" : ""
            } h-[175px]`} // Gray background only for style2
          >
            {buttonStyle === "style3" ? renderLargeNumberProgress() : (
              buttonStyle === "style2" ? renderProgressCircles() : (
                <div className="rounded-full h-6 relative">
                  <div
                    className="bg-blue-600 rounded-full p-4 mt-12"
                    style={{
                      width: `${((currentTemplateIndex + 1) / totalTemplates) * 100}%`,
                      height: "100%",
                    }}
                  >
                    <span className="text-black text-xs font-semibold absolute left-1/2 -translate-x-1/2 top-1/2 transform -translate-y-1/2">
                      {currentTemplateIndex + 1} of {totalTemplates}
                    </span>
                  </div>
                </div>
              )
            )}
          </div>

          {/* Image Below Progress Bar */}
          {imageUrl && (
            <div className="absolute top-16 left-0 right-0 flex justify-center p-5">
              <img
                src={imageUrl}
                alt="Template"
                className="max-w-full h-auto rounded-lg"
                style={{ maxHeight: "200px", width: "auto" }}
              />
            </div>
          )}

          {/* Quiz Content */}
          <div className={`p-8 ${imageUrl ? "mt-64" : "mt-48"}`}>
            {/* Render styled containers for questions and answers */}
            {getStyledContainer()}
          </div>
        </div>
      </div>
    </div>
  );
}
