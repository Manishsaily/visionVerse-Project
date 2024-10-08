import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const tabsData = [
  {
    label: "Style",
    links: "/style",
  },
  {
    label: "Layouts",
    links: "/template",
  },
  {
    label: "Setting",
    links: "/setting",
  },
];

const handleQuizSubmit = async (e) => {
  e.preventDefault();

  const isLarge = localStorage.getItem("isLarge") === "true"; // Ensure it's a boolean
  const layout = localStorage.getItem("layout") || "stacked";
  const backgroundColor = localStorage.getItem("backgroundColor") || "white";
  const buttonColor = localStorage.getItem("buttonColor") || "lightblue";
  const buttonStyle = localStorage.getItem("buttonStyle") || "style1";
  const quizName = localStorage.getItem("quizName") || "Quiz Name";
  const quizID = localStorage.getItem("QuizID");
  const questionsJSON = localStorage.getItem("templates");

  if (!quizID) {
    alert("No quiz ID found. Please create a quiz first.");
    return; // Stop execution if no quiz ID is present
  }

  let questionsToUpdate;
  try {
    questionsToUpdate = JSON.parse(questionsJSON)
      .map((template) => ({
        questionText: template.question,
        answers: template.answers,
        questionID: template.id || null, // Ensure you have the QuestionID
      }))
      .filter((q) => q.questionID); // Filter out any questions without an ID
  } catch (error) {
    console.error("Failed to parse questions:", error);
    alert("Error retrieving questions. Please check your data.");
    return;
  }

  try {
    // Send PATCH request to update quiz and questions
    const response = await fetch(`/api/quizzes`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        quizData: {
          quizID,
          quizName,
          layout,
          backgroundColor,
          buttonColor,
          isLarge,
          buttonStyle,
        },
        questionsToUpdate,
      }),
    });

    const result = await response.json();

    if (result.error) {
      console.error(result.error);
      alert("Failed to save quiz: " + result.error);
    } else {
      alert("Quiz and questions updated successfully!");
    }
  } catch (error) {
    console.error("Error:", error);
  }
};

const NavBar = () => {
  const pathname = usePathname();
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  return (
    <>
      <div className="bg-green-900">
        <div className="flex justify-between items-center bg-[#31dce2] p-5">
          <Link href="/">
            <button className="border-solid border-2 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg">
              Cancel
            </button>
          </Link>

          <button
            onClick={(e) => handleQuizSubmit(e)}
            className="border-solid border-2 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg"
          >
            Save
          </button>
        </div>
      </div>
      {pathname !== "/quizzes" && (
        <div className="flex justify-start w-1/4 ml-20">
          <div className="flex space-x-2 w-full rounded-t-lg overflow-hidden shadow-lg">
            {/* Loop through tab data and render button each button */}
            {tabsData.map((tab, index) => {
              return (
                <Link href={tab.links} key={index} className="w-full">
                  <button
                    className={`w-full py-2 text-lg transition-colors duration-300 text-black
                  ${
                    index === activeTabIndex
                      ? "border-b-4 border-teal-500 bg-gray-200"
                      : "border-b-4 border-transparent bg-transparent hover:bg-gray-200"
                  }`}
                    style={{
                      borderTopLeftRadius: "1rem",
                      borderTopRightRadius: "1rem",
                    }}
                    onClick={() => setActiveTabIndex(index)}
                  >
                    {tab.label}
                  </button>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default NavBar;
