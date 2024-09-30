"use client";
import React, { useEffect, useState } from "react";

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
    <div>
      <h2>My Quizzes</h2>
      <ul>
        {quizzes.map((quiz) => (
          <li key={quiz.QuizID} style={{ color: "black" }}>
            <br />
            <h3 style={{ color: "black" }}>{quiz.Layout}</h3>
            <h3 style={{ color: "black" }}>{quiz.BackgroundColor}</h3>
            <h3 style={{ color: "black" }}>{quiz.ButtonColor}</h3>
            <h3 style={{ color: "black" }}>
              {quiz.IsLarge !== null && quiz.IsLarge !== undefined
                ? quiz.IsLarge.toString()
                : "N/A"}
            </h3>
            <p style={{ color: "black" }}>
              Created on: {new Date(quiz.DateCreated).toLocaleDateString()}
            </p>
            <h4 style={{ color: "black" }}>Questions:</h4>
            <ul>
              {Array.isArray(quiz.Questions) && quiz.Questions.length > 0 ? (
                quiz.Questions.map((question) => (
                  <li key={question.QuestionID} style={{ color: "black" }}>
                    <p style={{ color: "black" }}>{question.QuestionText}</p>
                    <p style={{ color: "black" }}>
                      Answers: {question.Answers.join(", ")}
                    </p>
                  </li>
                ))
              ) : (
                <p style={{ color: "black" }}>
                  No questions available for this quiz.
                </p>
              )}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyQuizzes;
