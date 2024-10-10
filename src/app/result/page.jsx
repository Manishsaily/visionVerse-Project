"use client";

import React, { useState, useEffect } from "react";
import TemplatePreview from "../components/TemplatePreview";
import ResultManager from "../components/ResultManager";

export default function EditorPage() {
  const [templates, setTemplates] = useState(() => {
    try {
      const savedTemplates = localStorage.getItem("templates");
      return savedTemplates
        ? JSON.parse(savedTemplates)
        : [
            {
              question: "What is the Question?",
              answers: ["Answer 1", "Answer 2", "Answer 3", "Answer 4"],
              imageUrl: "",
            },
          ];
    } catch (error) {
      console.error("Error retrieving templates from localStorage", error);
      return [
        {
          question: "What is the Question?",
          answers: ["Answer 1", "Answer 2", "Answer 3", "Answer 4"],
          imageUrl: "",
        },
      ];
    }
  });

  const [results, setResults] = useState([
    { message: "You have won a free coffee!", coupon: "" },
  ]);

  const addNewResult = () => {
    setResults([
      ...results,
      { message: "You have won something!", coupon: "" },
    ]);
  };

  const removeResult = (index) => {
    setResults(results.filter((_, i) => i !== index));
  };

  const handleCouponChange = (index, event) => {
    const newResults = [...results];
    newResults[index].coupon = event.target.value;
    setResults(newResults);
  };

  const [totalTemplates, setTotalTemplates] = useState(
    templates.length > 7 ? 7 : templates.length
  );
  const [currentTemplateIndex, setCurrentTemplateIndex] = useState(0);
  const [progressDisplay, setProgressDisplay] = useState("No Questions");

  const [buttonStyle] = useState(() => {
    try {
      return localStorage.getItem("buttonStyle") || "style1";
    } catch (error) {
      console.error("Error accessing localStorage", error);
      return "style1";
    }
  });

  const [islarge, setIsBig] = useState(false);
  useEffect(() => {
    try {
      localStorage.setItem("isLarge", JSON.stringify(islarge));
    } catch (error) {
      console.error("Error saving islarge to localStorage", error);
    }
  }, [islarge]);

  const [layout, setLayout] = useState(() => {
    try {
      return localStorage.getItem("layout") || "stacked";
    } catch (error) {
      console.error("Error accessing localStorage", error);
      return "stacked";
    }
  });

  useEffect(() => {
    const syncLayoutAcrossTabs = (event) => {
      if (event.key === "layout") {
        setLayout(event.newValue);
      }
    };

    window.addEventListener("storage", syncLayoutAcrossTabs);
    return () => {
      window.removeEventListener("storage", syncLayoutAcrossTabs);
    };
  }, []);

  // Save templates to localStorage when they change
  useEffect(() => {
    try {
      localStorage.setItem("templates", JSON.stringify(templates));
    } catch (error) {
      console.error("Error saving templates to localStorage", error);
    }
  }, [templates]);

  useEffect(() => {
    setProgressDisplay(
      totalTemplates > 0
        ? `Question ${currentTemplateIndex + 1} / ${totalTemplates}`
        : "No Questions"
    );
  }, [templates, currentTemplateIndex, totalTemplates]);

  const handleImageUpload = (index, event) => {
    const file = event.target.files[0]; // Get the uploaded file
    if (file) {
      const imageUrl = URL.createObjectURL(file); // Create a URL for the file
      const updatedTemplates = [...templates];
      updatedTemplates[index].imageUrl = imageUrl; // Update the image URL
      setTemplates(updatedTemplates);
    }
  };

  const removeImage = (index) => {
    const updatedTemplates = [...templates];
    updatedTemplates[index].imageUrl = ""; // Clear the image URL
    setTemplates(updatedTemplates);
  };

  useEffect(() => {
    setTotalTemplates(templates.length);
    setProgressDisplay(
      `Question ${currentTemplateIndex + 1} of ${totalTemplates}`
    );
  }, [templates, currentTemplateIndex]);

  const TemplatePreviewSmall = ({ template, onClick, isActive }) => {
    return (
      <div
        className={`p-2 border rounded-lg mb-2 cursor-pointer hover:shadow-lg ${
          isActive ? "border-blue-500 bg-blue-100" : "border-gray-300"
        }`}
        onClick={onClick}
        style={{
          backgroundColor: isActive
            ? "rgba(173, 216, 230, 0.5)"
            : "rgba(255, 255, 255, 0.9)", // Highlight background for active
        }}
      >
        <div className="flex flex-col">
          {template.imageUrl && (
            <img
              src={template.imageUrl}
              alt="thumbnail"
              className="w-16 h-16 object-cover mb-2 rounded-md"
            />
          )}
          <p className="text-sm font-semibold">{template.question}</p>
        </div>
      </div>
    );
  };

  const [buttonColor, setButtonColor] = useState(() => {
    try {
      return localStorage.getItem("buttonColor") || "lightblue";
    } catch (error) {
      console.error("Error accessing localStorage", error);
      return "lightblue";
    }
  });

  const [backgroundColor, setBackgroundColor] = useState(() => {
    try {
      return localStorage.getItem("backgroundColor") || "white";
    } catch (error) {
      console.error("Error accessing localStorage", error);
      return "white";
    }
  });

  return (
    <div className="flex min-h-full bg-gray-100 text-black">
      {/* Editor Controls */}
      <div className="w-1/4 ml-20 p-4 mt-6 bg-white border-r border-gray-300 rounded-xl shadow-lg">
        <form>
          {/* Questions and Image Uploads */}
          <ResultManager
            results={results}
            addNewResult={addNewResult}
            removeResult={removeResult}
            handleCouponChange={handleCouponChange}
          />
        </form>
      </div>

      {/* Template Preview */}
      <div className="ml-52 p-4 ">
        {/* Render only the current template */}
        {templates.length > 0 && (
          <div className="mb-6">
            <TemplatePreview
              {...templates[currentTemplateIndex]} // only show the current template
              islarge={islarge}
              layout={layout}
              buttonColor={buttonColor}
              backgroundColor={backgroundColor}
              questions={[templates[currentTemplateIndex].question]}
              answers={templates[currentTemplateIndex].answers}
              buttonStyle={buttonStyle}
              totalTemplates={totalTemplates}
              currentTemplateIndex={currentTemplateIndex}
            />
          </div>
        )}
      </div>

      {/* Side Preview of All Templates */}
      <div className="fixed top-1/2 right-0 transform -translate-y-1/2 z-40 p-4 bg-white border border-gray-200 shadow-md rounded-lg">
        <h2 className="font-bold mb-2">Quiz Previews</h2>
        <div>{progressDisplay}</div>
        {templates.map((template, index) => (
          <TemplatePreviewSmall
            key={index}
            template={template}
            onClick={() => setCurrentTemplateIndex(index)} // Set current template index on click
            isActive={currentTemplateIndex === index} // Highlight if active
          />
        ))}
      </div>
    </div>
  );
}
