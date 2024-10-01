"use client";
import React, { useEffect, useState } from "react";
import TemplatePreview from "../components/TemplatePreview";

const MyQuizzes = () => {
  const [quizzes, setQuizzes] = useState([]);
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

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">My Quiz</h2>
      <div className="grid grid-cols-1 gap-4">
        {quizzes.map((quiz) => (
          <div key={quiz.QuizID} className="border p-4 rounded-lg bg-white">
            {/* Iterate through each question in the quiz */}
            {quiz.Questions.map((question) => (
              <TemplatePreview
                key={question.QuestionID}
                questions={[question.QuestionText]} // Pass individual question text
                answers={question.Answers} // Pass corresponding answers for each question
                layout={quiz.Layout} 
                buttonColor={quiz.ButtonColor} 
                backgroundColor={quiz.BackgroundColor} 
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyQuizzes;

