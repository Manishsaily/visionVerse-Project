"use client";
import React, { useEffect, useState } from "react";
import TemplatePreview from "../components/TemplatePreview";

const MyQuizzes = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0); // Track the current quiz
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // Track the current question
  const userId = 1; // Replace this with the actual user ID

  // Fetch quizzes from the API
  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await fetch(`/api/quizzes?userId=${userId}`);

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();

        // Debugging: Log the fetched data
        console.log("Fetched quizzes:", data);

        // Check if data is valid
        if (!data || !Array.isArray(data)) {
          throw new Error("Invalid data format");
        }

        setQuizzes(data);
      } catch (error) {
        console.error("Error fetching quizzes:", error);
      }
    };

    fetchQuizzes();
  }, [userId]);

  // Function to handle Next
  const handleNext = () => {
    if (currentQuestionIndex < quizzes[currentQuizIndex].Questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    } else if (currentQuizIndex < quizzes.length - 1) {
      // Move to the next quiz
      setCurrentQuizIndex((prevIndex) => prevIndex + 1);
      setCurrentQuestionIndex(0); // Reset question index to 0 for the new quiz
    }
  };

  // Function to handle Previous
  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
    } else if (currentQuizIndex > 0) {
      // Move to the previous quiz
      setCurrentQuizIndex((prevIndex) => prevIndex - 1);
      setCurrentQuestionIndex(quizzes[currentQuizIndex - 1].Questions.length - 1); // Go to the last question of the previous quiz
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">My Quizzes</h2>
      <div className="grid grid-cols-1 gap-4">
        {quizzes.length > 0 && (
          <div key={quizzes[currentQuizIndex].QuizID} className="border p-4 rounded-lg bg-white">
            {/* Render the current question in the TemplatePreview */}
            <TemplatePreview
              key={quizzes[currentQuizIndex].Questions[currentQuestionIndex].QuestionID} // Unique key for the current question
              questions={[quizzes[currentQuizIndex].Questions[currentQuestionIndex].QuestionText]} // Pass the current question text
              answers={quizzes[currentQuizIndex].Questions[currentQuestionIndex].Answers} // Pass corresponding answers for the current question
              layout={quizzes[currentQuizIndex].Layout}
              buttonColor={quizzes[currentQuizIndex].ButtonColor}
              backgroundColor={quizzes[currentQuizIndex].BackgroundColor}
              buttonStyle={quizzes[currentQuizIndex].buttonStyle}
              currentTemplateIndex={currentQuestionIndex} // Set appropriate index
              totalTemplates={quizzes[currentQuizIndex].Questions.length} // Total number of questions in the current quiz
            />
            {/* Navigation Buttons */}
            <div className="flex justify-between mt-4">
              <button
                onClick={handlePrev}
                disabled={currentQuizIndex === 0 && currentQuestionIndex === 0} // Disable if on the first question of the first quiz
                className="px-4 py-2 bg-gray-300 rounded-lg"
              >
                Previous
              </button>
              <button
                onClick={handleNext}
                disabled={currentQuizIndex === quizzes.length - 1 && currentQuestionIndex === quizzes[currentQuizIndex].Questions.length - 1} // Disable if on the last question of the last quiz
                className="px-4 py-2 bg-gray-300 rounded-lg"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyQuizzes;
