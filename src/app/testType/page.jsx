"use client"

import React from 'react'
import Link from 'next/link'
import { useState } from "react";

export default function testType() {
    const [activeButton, setActiveButton] = useState(null);

    // Handler to set the active button
    const handleButtonClick = (buttonIndex) => {
        setActiveButton(buttonIndex);
    };

  return (
    <div className="flex flex-col">
        <header className="p-6 text-center">
            <h1 className="text-4xl font-bold">Choose the Test Type</h1>
        </header>
        
        <div className="flex flex-1 pt-6">
            <button
            className={`flex-1 m-2 p-1 rounded ${activeButton === 1 ? "bg-blue-500" : "border-r-transparent"}`}
            onClick={() => handleButtonClick(1)}
            >
                <div className={`h-full w-full p-4 rounded ${activeButton === 1 ? "bg-gray-200" : "bg-gray-200 text-black"}`}>
                <h2 className='font-bold'>Sruvey</h2>
                <p>A Tool used to gather information, opinions, or feedback form praticipants through a series of quesitions.</p>
                </div>
            </button>

            <button
            className={`flex-1 m-2 p-1 rounded ${activeButton === 2 ? "bg-blue-500" : "border-r-transparent"}`}
            onClick={() => handleButtonClick(2)}
            >
                <div className={`h-full w-full p-4 rounded ${activeButton === 2 ? "bg-gray-200" : "bg-gray-200 text-black"}`}>
                <h2 className='font-bold' >Score Test</h2>
                <p>You will set up a series of quizzes with designbated right or wrong answers. At the end, the test will calculate how many quesitons the user answered correctly and display the total score as the result.</p>
                </div>
            </button>
            
            <button
            className={`flex-1 m-2 p-1 rounded ${activeButton === 3 ? "bg-blue-500" : "border-r-transparent"}`}
            onClick={() => handleButtonClick(3)}
            >
                <div className={`h-full w-full p-4 rounded ${activeButton === 3 ? "bg-gray-200" : "bg-gray-200 text-black"}`}>
                <h2 className='font-bold' >Personality Test</h2>
                <p>You will set up personalized results to help users receal aspexts of their character or behaviour.</p>
                </div>
            </button>
        </div>

 
        <div className="flex justify-center p-4">
            <Link href="/style">
            <button className="bg-blue-500 text-white py-2 px-4 rounded">
            Continue
            </button>
            </Link>
        </div>
    </div>
  );
}
