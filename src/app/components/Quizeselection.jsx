import { React } from "react";
import Link from "next/link";

const Quizselection = () => {
    return (
        <div className=" pt-6">
          <h1 className=" text-blue-700 text-center text-3xl font-medium my-6 ">
            Welcome to the DineSeal Quiz creation
          </h1>
          <div className=" flex justify-center items-center">
            <div className=" w-[300px] px-8 py-4 shadow-2xl bg-blue-400 text-white flex justify-center items-center flex-col gap-6 ">
              <h1 className=" font-extrabold text-xl ">Lets Create!</h1>
             
              <button className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold rounded-full transition-transform transform-gpu hover:-translate-y-1 hover:shadow-lg">
                <Link href="/testType" >Begin Creation</Link>
              </button>
           
            </div>
          </div>
        </div>
  );
};
export default Quizselection;