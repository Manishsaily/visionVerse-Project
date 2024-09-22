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
          <li key={quiz.QuizID}>
            <h3>{quiz.Name}</h3>
            <p>{quiz.Description}</p>
            <p>Created on: {new Date(quiz.DateCreated).toLocaleDateString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyQuizzes;
