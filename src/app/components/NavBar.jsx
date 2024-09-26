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
    <>
    <div className="bg-green-900">
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
                  ${index === activeTabIndex
                    ? "border-b-4 border-teal-500 bg-gray-200"
                    : "border-b-4 border-transparent bg-transparent hover:bg-gray-200"
                  }`}
                style={{
                  borderTopLeftRadius: '1rem', 
                  borderTopRightRadius: '1rem', 
                  
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
