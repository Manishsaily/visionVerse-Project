import React, { useState } from "react";
import { motion } from "framer-motion";

export default function ResultPage({
  buttonColor,
  backgroundColor,
  buttonStyle,
  onRetry, // Function to retry the quiz
  onHome, // Function to go back to home or dashboard
  message,
  expirationDate,
  couponDetails,
}) {
  // Define the container for the result page
  const [flipped, setFlipped] = useState(false);

  const handleFlip = () => {
    setFlipped((prev) => !prev);
  };

  const imageUrl = "/coffee-2.webp"; // Replace with your image path
  const imageUrl2 = "/coffee.jpg"; // Replace with your image path

  const handleButtonClick = (event) => {
    event.stopPropagation(); // Prevent click from bubbling up
  };

  const getResultContainer = () => {
    return (
      <motion.div
        onClick={handleFlip}
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
          {/* Front Side */}
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
              Quiz Completed!
            </p>
            <p className="text-lg text-center">{message}</p>
            {getButton("Claim Coupon", onRetry)}
            {getButton("Go to Home", onHome)}
          </motion.div>

          {/* Back Side */}
          <motion.div
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
              justifyContent: "center", // Center vertically
              alignItems: "center", // Center horizontally
              padding: "20px",
              borderRadius: "20px",
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)", // Add shadow for depth
              color: "white",
            }}
          >
            <p className="text-2xl font-semibold mb-4 text-center">
              Coupon Details
            </p>
            <div
              style={{ width: "100%", textAlign: "left", marginBottom: "10px" }}
            >
              <p className="text-lg font-semibold">Expiry:</p>
              <p className="text-lg">{expirationDate}</p>
            </div>
            <div style={{ width: "100%", textAlign: "left" }}>
              <p className="text-lg font-semibold">Details:</p>
              <p className="text-lg">{couponDetails}</p>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    );
  };

  // Define the button style for the result page
  const getButton = (label, onClick) => {
    switch (buttonStyle) {
      case "style1":
        return (
          <button
            onClick={onClick}
            className="w-full mt-2 py-4 rounded-lg border-2 border-blue-500 text-black focus:outline-none focus:ring-2 text-lg"
            style={{ backgroundColor: "white" }}
          >
            {label}
          </button>
        );
      case "style2":
        return (
          <button
            onClick={onClick}
            className="w-full mt-2 py-4 rounded-lg border-2 border-white text-lg text-black"
            style={{ backgroundColor: "lightgray" }}
          >
            {label}
          </button>
        );
      case "style3":
        return (
          <button
            onClick={onClick}
            className="w-full mt-2 py-4 rounded-lg border-2 border-black bg-white text-black text-lg"
          >
            {label}
          </button>
        );
      case "style4":
        return (
          <button
            onClick={onClick}
            className="w-full mt-2 py-4 rounded-lg bg-gray-700 text-white text-lg"
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
          <div className="p-8 mt-52">{getResultContainer()}</div>
        </div>
      </div>
    </div>
  );
}
