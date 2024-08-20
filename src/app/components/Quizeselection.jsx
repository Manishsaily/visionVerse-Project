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
              <h1 className=" font-extrabold text-xl ">A Fun Quiz</h1>
              <div className="w-full justify-center flex">
                <button className=" bg-white px-5 py-2 rounded-sm text-black hover:cursor-pointer">
                  <Link href="/style" >Begin Creation</Link>
                </button>
              </div>
            </div>
          </div>
        </div>
  );
};
export default Quizselection;