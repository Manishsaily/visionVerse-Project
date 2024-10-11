import React from "react"

export default function ResultPage({
  buttonColor,
  backgroundColor,
  buttonStyle,
  onRetry,   // Function to retry the quiz
  onHome,    // Function to go back to home or dashboard
  results,
}) {
  // Define the container for the result page
  const getResultContainer = () => {
    return (
      <div
        className="flex flex-col items-center gap-10 p-12 px-4 rounded-lg"
        style={{ backgroundColor: buttonColor, borderRadius: "20px" }}
      >
        {/* Display the result message */}
        <p className="text-2xl font-semibold mb-4 text-center">
          Quiz Completed!
        </p>
        <p className="text-lg text-center">
        You have won a free coffee!
        </p>

        {/* Render Retry and Home buttons */}
        <div className="flex flex-col space-y-4 w-full">
          {getButton("Claim Coupon", onRetry)}
          {getButton("Go to Home", onHome)}
        </div>
      </div>
    );
  };

  // Define the button style for the result page
  const getButton = (label, onClick) => {
    switch (buttonStyle) {
      case "style1":
        return (
          <button
            onClick={onClick}
            className="w-full py-4 rounded-lg border-2 border-blue-500 text-black focus:outline-none focus:ring-2 text-lg"
            style={{ backgroundColor: "white" }}
          >
            {label}
          </button>
        );
      case "style2":
        return (
          <button
            onClick={onClick}
            className="w-full py-4 rounded-lg border-2 border-white text-lg text-black"
            style={{ backgroundColor: "lightgray" }}
          >
            {label}
          </button>
        );
      case "style3":
        return (
          <button
            onClick={onClick}
            className="w-full py-4 rounded-lg border-2 border-black bg-white text-black text-lg"
          >
            {label}
          </button>
        );
      case "style4":
        return (
          <button
            onClick={onClick}
            className="w-full py-4 rounded-lg bg-gray-700 text-white text-lg"
          >
            {label}
          </button>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      {/* Phone Screen Container */}
      <div className="w-[375px] h-[800px] bg-black border rounded-[40px] ml-52 overflow-hidden">
        <div
          className="h-full rounded-[40px] overflow-hidden"
          style={{ backgroundColor }}
        >
          {/* Result Content */}
          <div className="p-8 mt-52">
            {getResultContainer()}
          </div>
        </div>
      </div>
    </div>
  );
}
