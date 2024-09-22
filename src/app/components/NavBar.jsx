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

const NavBar = () => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  return (
    <div>
      <div className="flex justify-between items-center bg-[#31dce2] p-5">
        <Link href="/">
          <button className="border-solid border-2 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg">
            Cancel
          </button>
        </Link>

        <button className="border-solid border-2 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg">
          Save
        </button>
      </div>

      <div className="flex justify-start ">
        <div className="flex space-x-3 w-1/3">
          {/* Loop through tab data and render button each button */}
          {tabsData.map((tab, index) => {
            return (
              //changes the link for the tabs
              <Link href={tab.links} key={index} className="w-full">
                <button
                  key={index}
                  className={`w-full py-4 text-lg border-b-4 transition-colors duration-300 text-black
                ${
                  index === activeTabIndex
                    ? "border-teal-500"
                    : "border-transparent hover:border-gray-200"
                }`}
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
    </div>
  );
};

export default NavBar;
