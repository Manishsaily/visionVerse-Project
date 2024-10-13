import { React } from "react";
import Link from "next/link";

const Quizselection = () => {
    return (
      <div>
          {/* Navbar */}
          <nav className='bg-[#31dce2] text-black p-4'>
            <ul className='flex justify-center'>
                <li>
                    <a>Vision Verse Interactive</a>
                </li>
            </ul>
        </nav>

        <div className=" pt-6">
        {/* Heading */}
          <h1 className=" text-blue-600 text-center text-4xl font-bold my-6 ">
            DineSeal Quiz Creation
          </h1>
          <div className=" flex justify-center items-center">
            <div className=" w-[400px] h-[400px] px-8 py-5 shadow-2xl text-black flex justify-center items-center flex-col gap-6 "
              style={{borderRadius: '200px', backgroundColor: "#efefef", alignItems: 'center', justifyContent: 'center'}}>
              <h1 className=" font-extrabold text-xl ">Lets Create!</h1>
             
             {/* Next Page Button */}
              <button className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold rounded-full transition-transform transform-gpu hover:-translate-y-1 hover:shadow-lg">
                <Link href="/testType" >Begin Creation</Link>
              </button>
           
            </div>
          </div>
        </div>
      </div>
  );
};
export default Quizselection;
