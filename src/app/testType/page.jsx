"use client"

import React from 'react'
import Link from 'next/link'
import { useState } from "react";

export default function testType() {
    const [activeButton, setActiveButton] = useState(null);
    const [activeCheckbox, setActiveCheckbox] = useState({
        survey: false,
        quiz: false,
        personalityTest: false,
    });

    // Handler to set the active button
    const handleButtonClick = (buttonIndex) => {
        setActiveButton(buttonIndex);

        //Sets the active checkbox on button click/active button
        setActiveCheckbox ({
            survey: buttonIndex === 1 ? true : false,
            quiz: buttonIndex === 2 ? true : false,
            personalityTest: buttonIndex === 3 ? true : false,
        });
    };

  return (

    <div className="flex flex-col">

        {/* Navbar */}
        <nav className='bg-blue-600 text-white p-4'>
            <ul className='flex justify-between'>
                <li>
                    <Link href= "/">
                        <button style={{borderColor: 'white', borderWidth: '2px', borderRadius: '20px'}}>
                            <a style={{padding: "15px", paddingLeft: "25px", paddingRight: "25px"}}>Cancel</a>
                        </button>
                    </Link>
                </li>
                <li>
                    <button style={{borderColor: 'lightgray', borderWidth: '2px', borderRadius: '20px'}} disabled>
                        <a style={{padding: "15px", paddingLeft: "25px", paddingRight: "25px", color: 'lightgray'}}>Save</a>
                    </button>
                </li>
            </ul>
        </nav>

        <header className="p-6 text-center">
            <h1 className="text-4xl font-bold">Choose the Test Type</h1>
        </header>
        
        <div className="flex flex-1 pt-6 px-20">

            {/* Survey */} 
            <button
            className={`flex-1 m-2 p-1 ${activeButton === 1 ? "bg-blue-500" : "border-r-transparent"}`}
            style={{ height: '550px', display: 'flex', flexDirection: 'column', borderRadius: '53px'}}
            onClick={() => handleButtonClick(1)}>
                <div className={`h-full w-full p-4 flex flex-col justify-between shadow-lg ${activeButton === 1 ? "bg-gray-200" : "bg-gray-200 text-black"}`}
                style={{borderRadius: '50px'}}>
                    <div style={{paddingLeft: "10px", paddingRight: "10px"}}>
                        <div className='flex justify-between items-center' style={{paddingTop: '30px', paddingRight: '20px'}}>
                            <h2 className='font-bold text-left' style={{ fontSize: '20px', paddingBottom: '20px'}}>Survey</h2>
                            <input type='checkbox' className='form-checkbox' checked={activeCheckbox.survey} readOnly></input>
                        </div>
                        <p className='text-left'>A survey is a tool used to gather information, opinions, or feedback from participants through a series of questions.
                        The collected responses help to understand their preferences, behaviours, or experiences, and are often used 
                        to guide decision-making or improve services.
                        </p>
                    </div>

                    {/* Complexity + Engagement Metre */}
                    <div>
                        <div className='flex justify-left items-center mt-auto space-x-1' style={{paddingBottom: '15px', paddingLeft: '15px'}}>
                            <p style={{paddingRight: '5px'}}>Complexity</p>
                            <div className='w-2 h-5 bg-blue-600'></div>
                            <div className='w-2 h-5 bg-blue-600'></div>
                            <div className='w-2 h-5 bg-gray-400'></div>
                            <div className='w-2 h-5 bg-gray-400'></div>
                            <div className='w-2 h-5 bg-gray-400'></div>
                        </div>
                        <div className='flex justify-left items-center mt-auto space-x-1' style={{paddingBottom: '30px', paddingLeft: '15px'}}>
                            <p style={{paddingRight: '5px'}}>Engagement</p>
                            <div className='w-2 h-5 bg-blue-600'></div>
                            <div className='w-2 h-5 bg-blue-600'></div>
                            <div className='w-2 h-5 bg-blue-600'></div>
                            <div className='w-2 h-5 bg-gray-400'></div>
                            <div className='w-2 h-5 bg-gray-400'></div>
                        </div>
                    </div>
                </div>
            </button>

            {/* Quiz */} 
            <button
            className={`flex-1 m-2 p-1 ${activeButton === 2 ? "bg-blue-500" : "border-r-transparent"}`}
            style={{ height: '550px', display: 'flex', flexDirection: 'column', borderRadius: '53px'}}
            onClick={() => handleButtonClick(2)}>
                <div className={`h-full w-full p-4 flex flex-col justify-between shadow-lg ${activeButton === 2 ? "bg-gray-200" : "bg-gray-200 text-black"}`}
                style={{borderRadius: '50px'}}>
                    <div style={{paddingLeft: "10px", paddingRight: "10px"}}>
                        <div className='flex justify-between items-center' style={{paddingTop: '30px', paddingRight: '20px'}}>
                            <h2 className='font-bold text-left' style={{ fontSize: '20px', paddingBottom: '20px' }}>Quiz</h2>
                            <input type='checkbox' className='form-checkbox' checked={activeCheckbox.quiz} readOnly></input>
                        </div>
                        <p className='text-left'>You will set up a series of quizzes with designated right or wrong answers. At the end, the test will 
                        calculate how many questions the user answered correctly and display the total score as the result.
                        </p>
                    </div>

                    {/* Complexity + Engagement Metre */}
                    <div>
                        <div className='flex justify-left items-center mt-auto space-x-1' style={{paddingBottom: '15px', paddingLeft: '15px'}}>
                            <p style={{paddingRight: '5px'}}>Complexity</p>
                            <div className='w-2 h-5 bg-blue-600'></div>
                            <div className='w-2 h-5 bg-blue-600'></div>
                            <div className='w-2 h-5 bg-blue-600'></div>
                            <div className='w-2 h-5 bg-gray-400'></div>
                            <div className='w-2 h-5 bg-gray-400'></div>
                        </div>
                        <div className='flex justify-left items-center mt-auto space-x-1' style={{paddingBottom: '30px', paddingLeft: '15px'}}>
                            <p style={{paddingRight: '5px'}}>Engagement</p>
                            <div className='w-2 h-5 bg-blue-600'></div>
                            <div className='w-2 h-5 bg-blue-600'></div>
                            <div className='w-2 h-5 bg-blue-600'></div>
                            <div className='w-2 h-5 bg-blue-600'></div>
                            <div className='w-2 h-5 bg-gray-400'></div>
                        </div>
                    </div>
                </div>
            </button>
            
            {/* Personality Test */} 
            <button
            className={`flex-1 m-2 p-1 ${activeButton === 3 ? "bg-blue-500" : "border-r-transparent"}`}
            style={{ height: '550px', display: 'flex', flexDirection: 'column', borderRadius: '53px'}}
            onClick={() => handleButtonClick(3)}>
                <div className={`h-full w-full p-4 rounded-xl flex flex-col justify-between shadow-lg ${activeButton === 3 ? "bg-gray-200" : "bg-gray-200 text-black"}`}
                style={{borderRadius: '50px'}}>
                    <div style={{paddingLeft: "10px", paddingRight: "10px"}}>
                        <div className='flex justify-between items-center' style={{paddingTop: '30px', paddingRight: '20px'}}>
                            <h2 className='font-bold text-left' style={{ fontSize: '20px', paddingBottom: '20px' }}>Personality Test</h2>
                            <input type='checkbox' className='form-checkbox' checked={activeCheckbox.personalityTest} readOnly></input>
                        </div>
                        <p className='text-left'>You will set up personalized results to help users of their character or behaviour. 
                        Based on their responses, the test will generate a personalized result that refelects their personality traits, 
                        preferences, or tendencies. While it takes more time to set up, your customers will find it engaging, fun, 
                        and interactive!
                        </p>
                    </div>

                    {/* Complexity + Engagement Metre */}
                    <div>
                        <div className='flex justify-left items-center mt-auto space-x-1' style={{paddingBottom: '15px', paddingLeft: '15px'}}>
                            <p style={{paddingRight: '5px'}}>Complexity</p>
                            <div className='w-2 h-5 bg-blue-600'></div>
                            <div className='w-2 h-5 bg-blue-600'></div>
                            <div className='w-2 h-5 bg-blue-600'></div>
                            <div className='w-2 h-5 bg-blue-600'></div>
                            <div className='w-2 h-5 bg-blue-600'></div>
                        </div>
                        <div className='flex justify-left items-center mt-auto space-x-1' style={{paddingBottom: '30px', paddingLeft: '15px'}}>
                            <p style={{paddingRight: '5px'}}>Engagement</p>
                            <div className='w-2 h-5 bg-blue-600'></div>
                            <div className='w-2 h-5 bg-blue-600'></div>
                            <div className='w-2 h-5 bg-blue-600'></div>
                            <div className='w-2 h-5 bg-blue-600'></div>
                            <div className='w-2 h-5 bg-blue-600'></div>
                        </div>
                    </div>
                </div>
            </button>
        </div>

 
        <div className="flex justify-center p-4">
            <Link href="/style">
                <button className="bg-blue-600 text-white py-2 px-4 shadow-lg" style={{borderRadius: '25px', paddingRight: '50px', paddingLeft: '50px'}}>Continue</button>
            </Link>
        </div>
    </div>
  );
}
