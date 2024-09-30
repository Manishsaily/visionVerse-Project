import Link from "next/link";
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

  const layout = localStorage.getItem("layout") || "stacked";
  const backgroundColor = localStorage.getItem("backgroundColor") || "white";
  const buttonColor = localStorage.getItem("buttonColor") || "lightblue";
  const isLarge = localStorage.getItem("isLarge") || false;

  try {
    const response = await fetch("/api/quizzes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        layout,
        backgroundColor,
        buttonColor,
        userId: 1, // Replace with actual user ID
        isLarge, // Include the islarge variable
      }),
    });

    const result = await response.json();

    if (result.error) {
      console.error(result.error);
      alert("Failed to create quiz: " + result.error);
    } else {
      const quizID = result[0]?.QuizID; // Assuming this is the structure

      // Save QuizID to localStorage
      if (quizID) {
        localStorage.setItem("QuizID", quizID);
        alert("Quiz created successfully! Quiz ID: " + quizID);
      } else {
        console.error("QuizID not found in response.");
      }
    }
  } catch (error) {
    console.error("Error:", error);
  }
};

const NavBar = () => {
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
      <div className="flex justify-start w-1/4 ml-20">
        <div className="flex space-x-2 w-full rounded-t-lg overflow-hidden shadow-lg">
          {/* Loop through tab data and render button each button */}
          {tabsData.map((tab, index) => {
            return (
              // Changes the link for the tabs
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
                  // Change the active tab on click.
                  onClick={() => setActiveTabIndex(index)}
                >
                  {tab.label}
                </button>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default NavBar;
