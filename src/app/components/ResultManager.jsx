import React from "react";
import { FiClipboard, FiTrash, FiType } from "react-icons/fi";

const ResultManager = ({
  results,
  addNewResult,
  removeResult,
  handleCouponChange,
}) => {
  return (
    <div>
      {results.map((result, index) => (
        <div
          key={index}
          className="flex mb-6 bg-white rounded-lg shadow-md p-5"
        >
          <div className="flex-1 m-3">
            <h1 className="text-xl font-bold">Result</h1>
            <div className="flex items-center mt-4">
              <FiType />
              <input
                type="text"
                value={result.message}
                onChange={(e) => handleMessageChange(index, e)}
                className="flex-1 text-xl p-3 border border-gray-300 rounded-full shadow-sm ml-2"
                placeholder="Enter your message"
              />
            </div>
            <div className="flex items-center mt-4">
              <FiClipboard />
              <input
                type="text"
                value={result.coupon}
                onChange={(e) => handleCouponChange(index, e)}
                className="flex-1 text-xl p-3 border border-gray-300 rounded-full shadow-sm ml-2"
                placeholder="Enter your coupon code"
              />
            </div>
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={addNewResult}
        className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-600"
      >
        Add New Result
      </button>
    </div>
  );
};

export default ResultManager;
