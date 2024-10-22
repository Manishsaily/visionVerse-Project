"use client";
import React, { useEffect, useState } from "react";
import TemplatePreview from "../components/TemplatePreview";
import { FiTrash, FiEdit2 } from "react-icons/fi"; // Add FiPencil here
import CongratulationsScreen from "../components/CongratulationsScreen";

const MyQuizzes = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const userId = 1;

  // Fetch quizzes from the API
  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await fetch(`/api/quizzes?userId=${userId}`);
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        console.log("Fetched quizzes:", data);
        if (!data || !Array.isArray(data))
          throw new Error("Invalid data format");
        setQuizzes(data);
      } catch (error) {
        console.error("Error fetching quizzes:", error);
      }
    };
    fetchQuizzes();
  }, [userId]);

  // Function to handle delete
  const handleDelete = async (quizId) => {
    try {
      const response = await fetch(`/api/quizzes`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ quizId }),
      });
      if (!response.ok) throw new Error("Failed to delete quiz");

      // Remove the deleted quiz from the state
      setQuizzes((prevQuizzes) =>
        prevQuizzes.filter((quiz) => quiz.QuizID !== quizId)
      );
      console.log("Quiz deleted successfully");
    } catch (error) {
      console.error("Error deleting quiz:", error);
    }
  };

  // Function to handle Next
  const handleNext = () => {
    // Check if there are more questions in the current quiz
    if (currentQuestionIndex < quizzes[currentQuizIndex].Questions.length) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    }
  };

  // Function to handle Previous
  const handleRetry = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prevIndex) => prevIndex - currentQuestionIndex);
    }
  };

  // Function called when an answer is selected
  const handleAnswerSelect = (quizId) => {
    handleNext(quizId); // Move to the next question automatically
  };

  const handleEdit = (index) => {
    const quiz = quizzes[index]; // Get the selected quiz

    // Set the QuizID in local storage
    localStorage.setItem("QuizID", quiz.QuizID);

    // Set other quiz properties in local storage
    localStorage.setItem("quizName", quiz.Name);
    localStorage.setItem("isLarge", quiz.IsLarge);
    localStorage.setItem("layout", quiz.Layout);
    localStorage.setItem("backgroundColor", quiz.BackgroundColor);
    localStorage.setItem("buttonColor", quiz.ButtonColor);
    localStorage.setItem("buttonStyle", quiz.buttonStyle);

    // Format questions for local storage
    const formattedQuestions = quiz.Questions.map((question) => ({
      question: question.QuestionText,
      answers: question.Answers,
      imageUrl: "", // Adjust this if you need an image URL
    }));

    // Set questions to local storage
    localStorage.setItem("templates", JSON.stringify(formattedQuestions));

    // Redirect to the setting page
    window.location.href = "/setting";
  };

  const handleQuizSelect = (index) => {
    setCurrentQuizIndex(index);
    setCurrentQuestionIndex(0); // Reset to the first question of the selected quiz
  };

  const currentQuiz = quizzes[currentQuizIndex];
  const couponExists = currentQuiz && currentQuiz.CouponDetails;

  return (
    <div className="flex min-h-screen bg-gray-100 text-black">
      {/* Sidebar for displaying "My Quizzes" */}
      <div className="w-1/4 ml-20 p-4 mt-6 bg-white border-r border-gray-300 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold mb-4">My Quizzes</h2>
        <ul className="space-y-2">
          {quizzes.map((quiz, index) => (
            <li
              key={quiz.QuizID}
              className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-200 bg-gray-300"
            >
              <button
                onClick={() => handleEdit(index)}
                className="p-3"
                aria-label="Edit Quiz"
              >
                <FiEdit2 size={20} /> {/* Use a pencil icon here */}
              </button>
              <div
                className={`flex-grow cursor-pointer text-center`}
                onClick={() => handleQuizSelect(index)}
              >
                {quiz.Name} {/* Display quiz name */}
              </div>

              <button onClick={() => handleDelete(quiz.QuizID)} className="p-3">
                <FiTrash size={20} />
              </button>
            </li>
          ))}
        </ul>
      </div>
      {/* Main content area for the selected quiz */}
      <div className="p-6">
        {quizzes.length > 0 && (
          <div
            key={quizzes[currentQuizIndex].QuizID}
            className="border p-4 rounded-lg bg-white shadow-lg"
          >
            {currentQuestionIndex <
            quizzes[currentQuizIndex].Questions.length ? (
              <TemplatePreview
                key={
                  quizzes[currentQuizIndex].Questions[currentQuestionIndex]
                    .QuestionID
                }
                questions={[
                  quizzes[currentQuizIndex].Questions[currentQuestionIndex]
                    .QuestionText,
                ]}
                answers={
                  quizzes[currentQuizIndex].Questions[currentQuestionIndex]
                    .Answers
                }
                layout={quizzes[currentQuizIndex].Layout}
                buttonColor={quizzes[currentQuizIndex].ButtonColor}
                backgroundColor={quizzes[currentQuizIndex].BackgroundColor}
                buttonStyle={quizzes[currentQuizIndex].buttonStyle}
                currentTemplateIndex={currentQuestionIndex}
                totalTemplates={quizzes[currentQuizIndex].Questions.length} // Include the default question
                onAnswerSelect={() =>
                  handleAnswerSelect(quizzes[currentQuizIndex].QuizID)
                }
              />
            ) : (
              <CongratulationsScreen
                key={currentQuiz.QuizID}
                layout={currentQuiz.Layout}
                buttonColor={currentQuiz.ButtonColor}
                backgroundColor={currentQuiz.BackgroundColor}
                buttonStyle={currentQuiz.buttonStyle}
                message={
                  couponExists
                    ? "You completed the quiz!"
                    : "Thank you for participating!"
                }
                expirationDate={
                  couponExists ? currentQuiz.CouponDetails.ExpirationDate : null
                }
                couponDetails={
                  couponExists ? currentQuiz.CouponDetails.Details : null
                }
                onRetry={handleRetry}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyQuizzes;
