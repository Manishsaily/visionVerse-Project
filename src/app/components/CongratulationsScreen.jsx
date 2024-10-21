import React, { useState } from "react";
import { motion } from "framer-motion";

export default function CongratulationsScreen({
  buttonColor,
  backgroundColor,
  buttonStyle,
  onRetry, // Function to retry the quiz
  onHome, // Function to go back to home or dashboard
  message = "Thank you for participating!", // Default message
  expirationDate,
  couponDetails,
  questions,
  answers,
  isLarge,
  layout,
  imageUrl3,
  imageUrl4,
  currentTemplateIndex = 0, // Default value
  totalTemplates = 1, // Default value
  onAnswerSelect,
}) {
  const [flipped, setFlipped] = useState(false);
  const imageUrl = "/coffee-2.webp"; // Replace with your image path
  const imageUrl2 = "/coffee.jpg"; // Replace with your image path

  const handleFlip = () => {
    setFlipped((prev) => !prev);
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
              idx === currentTemplateIndex
                ? "bg-orange-600 text-white"
                : "border-orange-600"
            }`}
          >
            {idx === currentTemplateIndex && (
              <span className="text-lg font-semibold">
                {currentTemplateIndex + 1}
              </span>
            )}
          </div>
        ))}
      </div>
    );
  };

  const getResultContainer = () => {
    return (
      <motion.div
        style={{
          perspective: "1000px",
          width: "300px", // Adjust width as needed
          height: "400px", // Adjust height as needed
          position: "relative",
          margin: "auto", // Center horizontally
        }}
      >
        <motion.div
          style={{
            width: "100%",
            height: "100%",
            position: "relative",
            transformStyle: "preserve-3d",
          }}
          animate={{
            rotateY: flipped ? 180 : 0,
            transition: { duration: 0.6 },
          }}
        >
          {/* Front Side - Congratulations Message */}
          <motion.div
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              backfaceVisibility: "hidden",
              backgroundImage: `url(${imageUrl})`, // Replace with your image path
              backgroundSize: "cover", // Cover the entire area
              backgroundPosition: "center", // Center the image
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              padding: "20px",
              borderRadius: "20px",
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
              color: "white",
            }}
          >
            <p className="text-2xl font-semibold mb-4 text-center">
              Congratulations!
            </p>
            <p className="text-lg text-center">{message}</p>
            <button
              onClick={onHome}
              className="w-full mt-2 py-4 rounded-lg bg-white text-black"
            >
              Go to Home
            </button>
            {couponDetails && (
              <button
                onClick={handleFlip}
                className="w-full mt-2 py-4 rounded-lg bg-white text-black"
              >
                Claim Coupon
              </button>
            )}
            {!couponDetails && (
              <button
                onClick={onRetry}
                className="w-full mt-2 py-4 rounded-lg bg-white text-black"
              >
                Retry Quiz
              </button>
            )}
          </motion.div>

          {/* Back Side - Coupon Details */}
          {couponDetails && (
            <motion.div
              onClick={handleFlip}
              style={{
                position: "absolute",
                width: "100%",
                height: "100%",
                backfaceVisibility: "hidden",
                rotateY: 180,
                backgroundImage: `url(${imageUrl2})`, // Replace with your image path
                backgroundSize: "cover", // Cover the entire area
                backgroundPosition: "center", // Center the image
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                padding: "20px",
                borderRadius: "20px",
                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
                color: "white",
              }}
            >
              <p className="text-2xl font-semibold mb-4 text-center">
                Coupon Details
              </p>
              <div
                style={{
                  width: "100%",
                  textAlign: "left",
                  marginBottom: "10px",
                }}
              >
                <p className="text-lg font-semibold">Expiry:</p>
                <p className="text-lg">{expirationDate}</p>
              </div>
              <div style={{ width: "100%", textAlign: "left" }}>
                <p className="text-lg font-semibold">Details:</p>
                <p className="text-lg">{couponDetails}</p>
              </div>
              <button
                onClick={handleFlip}
                className="w-full mt-2 py-4 rounded-lg bg-white text-black"
              >
                Go Back
              </button>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    );
  };

  return (
    <div>
      {/* Phone Screen Container */}
      <div className="w-[375px] h-[800px] bg-black border rounded-[40px] overflow-hidden shadow-lg">
        <div
          className="h-full rounded-[40px] overflow-hidden relative"
          style={{ backgroundColor }}
        >
          {/* Progress Bar Container */}
          <div
            className={`w-full px-4 py-2 ${
              buttonStyle === "style2" ? "bg-gray-400" : ""
            } h-[175px]`} // Gray background only for style2
          >
            {buttonStyle === "style3" ? (
              renderLargeNumberProgress()
            ) : buttonStyle === "style2" ? (
              renderProgressCircles()
            ) : (
              <div className="rounded-full h-6 relative">
                <div
                  className="bg-blue-600 rounded-full p-4 mt-12"
                  style={{
                    width: `${
                      ((currentTemplateIndex + 1) / totalTemplates) * 100
                    }%`,
                    height: "100%",
                  }}
                >
                  <span className="text-black text-xs font-semibold absolute left-1/2 -translate-x-1/2 top-1/2 transform -translate-y-1/2">
                    {currentTemplateIndex + 1} of {totalTemplates}
                  </span>
                </div>
              </div>
            )}
          </div>
          {/* Result Content */}
          <div className={`p-8 `}>
            {/* Render styled containers for questions and answers */}
            {getResultContainer()}
          </div>
        </div>
      </div>
    </div>
  );
}
