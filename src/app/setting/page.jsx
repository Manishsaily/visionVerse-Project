"use client";

import React, { useState, useEffect } from "react";
import TemplatePreview from "../components/TemplatePreview";
import {
  FiImage,
  FiTrash,
  FiCheck,
  FiRefreshCw,
  FiType,
  FiMinus,
  FiPlus,
} from "react-icons/fi"; //all the icons used for the editor tools
import { AiOutlinePlus, AiOutlineQuestionCircle } from "react-icons/ai";
import Link from "next/link";
import TemplateManager from "../components/TemplateManager";

export default function EditorPage() {
  const [quizName, setQuizName] = useState("");

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

  const handleQuestionChange = (index, userChange) => {
    const newTemplates = [...templates];
    newTemplates[index].question = userChange.target.value;
    setTemplates(newTemplates);
  };

  const handleAnswerChange = (templateIndex, answerIndex, userChange) => {
    const newTemplates = [...templates];
    newTemplates[templateIndex].answers[answerIndex] = userChange.target.value;
    setTemplates(newTemplates);
  };

  useEffect(() => {
    setProgressDisplay(
      totalTemplates > 0
        ? `Question ${currentTemplateIndex + 1} / ${totalTemplates}`
        : "No Questions"
    );
  }, [templates, currentTemplateIndex, totalTemplates]);

  const addNewTemplate = () => {
    setTemplates((prevTemplates) => {
      if (prevTemplates.length >= 7) {
        alert("You can only add up to 7 questions.");
        return prevTemplates; // Return without adding if already 7 templates
      }

      const newTemplates = [
        ...prevTemplates,
        {
          question: "What is the Question?",
          answers: ["Answer 1", "Answer 2", "Answer 3", "Answer 4"],
          imageUrl: "",
        },
      ];

      // Update counts for the new template
      setCounts((prevCounts) => [
        ...prevCounts,
        Array(4).fill(0), // Initialize counts for new answers
      ]);

      // Update totalTemplates if less than 7
      const updatedTotalTemplates =
        newTemplates.length > 7 ? 7 : newTemplates.length;
      setTotalTemplates(updatedTotalTemplates); // Correct way to update state

      // Update the progress display
      setProgressDisplay(
        `Question ${currentTemplateIndex + 1} of ${updatedTotalTemplates}`
      );
      setCurrentTemplateIndex((prevIndex) =>
        Math.min(prevIndex + 1, totalTemplates - 1)
      );
      return newTemplates;
    });
  };

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

  const removeTemplate = (templateIndex) => {
    setTemplates((prevTemplates) => {
      if (prevTemplates.length === 0) return prevTemplates; // No templates to remove

      const newTemplates = [...prevTemplates];
      newTemplates.splice(templateIndex, 1);

      // Update counts accordingly
      setCounts((prevCounts) => {
        const newCounts = [...prevCounts];
        newCounts.splice(templateIndex, 1); // Remove corresponding counts
        return newCounts;
      });

      // Update totalTemplates using setTotalTemplates
      const updatedTotalTemplates =
        newTemplates.length > 7 ? 7 : newTemplates.length;
      setTotalTemplates(updatedTotalTemplates); // Use the setter function to update state

      // Handle edge case when the current template is removed
      if (currentTemplateIndex >= updatedTotalTemplates) {
        setCurrentTemplateIndex(updatedTotalTemplates - 1); // Move to the last available template
      }

      // Update progress display
      setProgressDisplay(
        `Question ${currentTemplateIndex + 1} of ${updatedTotalTemplates}`
      );

      return newTemplates;
    });
  };

  // Reset Functionality
  const resetTemplatesAndLayout = () => {
    // Clear localStorage
    localStorage.removeItem("templates");
    localStorage.removeItem("layout");
    localStorage.removeItem("buttonColor");
    localStorage.removeItem("backgroundColor");
    localStorage.removeItem("isLarge");
    localStorage.removeItem("QuizID");
    localStorage.removeItem("quizName");
    setCounts([Array(4).fill(0)]);

    // Reset state to default values
    setTemplates([
      {
        question: "What is the Question?",
        answers: ["Answer 1", "Answer 2", "Answer 3", "Answer 4"],
        imageUrl: "",
      },
    ]);

    setLayout("stacked");
    setIsBig(false); // Reset to small text
    setBackgroundColor("white");
    setButtonColor("lightblue");
    setTotalTemplates(1); // Start with 1 default question
    setCurrentTemplateIndex(0);
    setProgressDisplay(`Question 1 of 1`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = 1; // Replace with the actual user ID
    const layout = localStorage.getItem("layout") || "stacked";
    const backgroundColor = localStorage.getItem("backgroundColor") || "white";
    const buttonColor = localStorage.getItem("buttonColor") || "lightblue";
    const isLarge = localStorage.getItem("isLarge") || false;
    const buttonStyle = localStorage.getItem("buttonStyle") || "style1";
    const quizName = localStorage.getItem("quizName") || "Quiz Name";

    // Step 1: Create the quiz
    try {
      const response = await fetch("/api/quizzes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          quizName,
          layout,
          backgroundColor,
          buttonColor,
          userId,
          isLarge,
          buttonStyle,
        }),
      });

      const result = await response.json();

      // Handle quiz creation response
      if (result.error) {
        console.error(result.error);
        alert("Failed to create quiz: " + result.error);
        return; // Exit if quiz creation fails
      }

      const quizID = result[0].QuizID;
      localStorage.setItem("QuizID", quizID);
      console.log("QuizID saved to localStorage:", quizID);

      // Step 2: Prepare and submit the questions
      const questionsToSubmit = templates
        .map((template) => ({
          questionText: template.question.trim() || "Default Question",
          answers: template.answers.map(
            (answer) => answer.trim() || "Default Answer"
          ),
          quizId: parseInt(quizID, 10),
        }))
        .filter((q) => q.questionText);

      if (questionsToSubmit.length === 0) {
        alert("No valid questions to submit.");
        return;
      }

      const questionsResponse = await fetch("/api/questions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(questionsToSubmit),
      });

      const questionsResult = await questionsResponse.json();

      if (questionsResult.error) {
        console.error(questionsResult.error);
        alert("Failed to create questions: " + questionsResult.error);
      } else {
        alert("Quiz and questions created successfully!");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while creating the quiz and questions.");
    }
  };

  const [backgroundColor, setBackgroundColor] = useState(() => {
    try {
      return localStorage.getItem("backgroundColor") || "white";
    } catch (error) {
      console.error("Error accessing localStorage", error);
      return "white";
    }
  });

  const [buttonColor, setButtonColor] = useState(() => {
    try {
      return localStorage.getItem("buttonColor") || "lightblue";
    } catch (error) {
      console.error("Error accessing localStorage", error);
      return "lightblue";
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("quizName", quizName);
    } catch (error) {
      console.error("Error setting quizName in localStorage", error);
    }
  }, [quizName]);

  const toggleSize = () => {
    setIsBig(!islarge);
  };

  // Add a state to track counts for each answer (used for the scoring system)
  const [counts, setCounts] = useState(() => {
    return templates.map(() => Array(4).fill(0)); // Initialize counters to 0 for each answer
  });

  // Function to increment the counter
  const incrementCount = (templateIndex, answerIndex) => {
    const newCounts = [...counts];
    newCounts[templateIndex][answerIndex] += 1;
    setCounts(newCounts);
  };

  // Function to decrement the counter
  const decrementCount = (templateIndex, answerIndex) => {
    const newCounts = [...counts];
    if (newCounts[templateIndex][answerIndex] > 0) {
      newCounts[templateIndex][answerIndex] -= 1;
    }
    setCounts(newCounts);
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

  return (
    <div className="flex min-h-full bg-gray-100 text-black">
      {/* Editor Controls */}
      <div className="w-1/4 ml-20 p-4 mt-6 bg-white border-r border-gray-300 rounded-xl shadow-lg">
        <form onSubmit={handleSubmit}>
          <div className="mb-4 flex justify-between items-center">
            <button
              type="button"
              onClick={toggleSize}
              className={`py-2 px-4 flex items-center gap-2 rounded-full shadow-md ${
                islarge ? "bg-gray-800 text-white" : "bg-gray-300 text-black"
              }`}
            >
              <AiOutlineQuestionCircle />
              {islarge ? "Text Large" : "Text Small"}
            </button>
            <input
              type="text"
              value={quizName}
              onChange={(e) => setQuizName(e.target.value)}
              className="border border-gray-300 p-2 rounded ml-4"
              placeholder="Quiz Name"
            />
          </div>
          {/* Questions and Image Uploads */}
          <TemplateManager
            templates={templates}
            addNewTemplate={addNewTemplate}
            removeTemplate={removeTemplate}
            handleQuestionChange={handleQuestionChange}
            handleImageUpload={handleImageUpload}
            removeImage={removeImage}
            handleAnswerChange={handleAnswerChange}
          />
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 flex items-center gap-2 rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <FiCheck />
            Submit Questions
          </button>
          {/* Reset Button */}
          <button
            type="button"
            onClick={resetTemplatesAndLayout}
            className="mt-4 bg-yellow-500 text-white py-2 px-4 flex items-center gap-2 rounded-full hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          >
            <FiRefreshCw />
            Reset
          </button>
          <Link href="/quizzes" passHref>
            <button
              type="submit"
              className="mt-4 bg-blue-500 text-white py-2 px-4 flex items-center gap-2 rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              Previews
            </button>
          </Link>
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

const handleEdit = async (quizId) => {
  localStorage.setItem("QuizID", quizId);
  try {
    const response = await fetch(`/api/quizzes/${quizId}`); // Adjust the endpoint as needed
    if (!response.ok) throw new Error("Failed to fetch quiz data");
    const quizData = await response.json();

    // Set quiz properties to local storage
    localStorage.setItem("quizName", quizData.Name);
    localStorage.setItem("isLarge", quizData.IsLarge);
    localStorage.setItem("layout", quizData.Layout);
    localStorage.setItem("backgroundColor", quizData.BackgroundColor);
    localStorage.setItem("buttonColor", quizData.ButtonColor);
    localStorage.setItem("buttonStyle", quizData.buttonStyle);

    // Structure questions for local storage
    const formattedQuestions = quizData.Questions.map((question) => ({
      question: question.QuestionText,
      answers: question.Answers,
      imageUrl: "", // Set this based on your requirements, if applicable
    }));

    // Set questions to local storage
    localStorage.setItem("templates", JSON.stringify(formattedQuestions));

    // Redirect to the setting page
    window.location.href = "/setting";
  } catch (error) {
    console.error("Error fetching quiz data:", error);
  }
};
