"use client"

import Link from 'next/link';

const NavBar = () => {

  
  return (

    <div>
      <div className="flex justify-between items-center bg-[#50A2A7] p-5">
        <Link href = "/">
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg"
        >
        Cancel
      </button>
      </Link>

      <h1 className="text-black font-bold">This is the Top of the page</h1>
      <button
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg"
      //   onClick={() => handleNavigation('')}  
      >
        Save
      </button>
    </div>
      <ul className="flex justify-around w-1/3 p-2 mx-3">
          <li className="flex">
            <Link href ="/style">
              <button
              className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg border border-gray-900 text-gray-900 hover:opacity-75 focus:ring focus:ring-gray-300 active:opacity-[0.85]"
              >Style
              </button>
            </Link>
          </li>
          <li className="flex">
            <Link href ="/template">
              <button
              className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg border border-gray-900 text-gray-900 hover:opacity-75 focus:ring focus:ring-gray-300 active:opacity-[0.85]"
              >
              Template
              </button>
            </Link>
          </li>
          <li className="flex">
            <Link href ="/setting">
              <button
              className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg border border-gray-900 text-gray-900 hover:opacity-75 focus:ring focus:ring-gray-300 active:opacity-[0.85]"
              >
              Settings
              </button>
            </Link>
          </li>
      </ul>
    </div>
  );
}

export default NavBar