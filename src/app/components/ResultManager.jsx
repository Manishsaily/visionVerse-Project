import React from "react";
import { FiClipboard, FiImage, FiTrash, FiType } from "react-icons/fi";

const ResultManager = ({
  results,
  addNewResult,
  removeResult,
  handleImageUpload,
  removeImage,
  handleMessageChange,
  handleDetailsChange,
  handleExpirationDateChange,
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
            <h1>Select a header image:</h1>
            <div className="flex items-center mb-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <FiImage />
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(index, e)}
                  className="border rounded-full p-2 w-full"
                />
              </label>

              {result.imageUrl && (
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="ml-2 bg-red-500 text-white py-2 px-4 flex items-center gap-2 rounded-full hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
                >
                  <FiTrash />
                  Remove Image
                </button>
              )}
            </div>
            <div className="flex items-center mt-4">
              <FiType />
              <input
                type="date"
                value={result.expirationDate}
                onChange={(e) => handleExpirationDateChange(index, e)}
                className="flex-1 text-xl p-3 border border-gray-300 rounded-full shadow-sm ml-2"
                placeholder="Expiration Date (DD/MM/YYYY)"
              />
            </div>
            <div className="flex mt-4">
              <FiType className="mt-2" />
              <textarea
                value={result.details}
                onChange={(e) => handleDetailsChange(index, e)}
                className="flex-1 text-xl p-3 border border-gray-300 rounded-xl shadow-sm ml-2 pb-20"
                placeholder="Enter coupon terms and conditions"
                rows={3} // You can adjust the number of visible rows
                style={{ overflow: "hidden" }} // Prevent manual resizing
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
        Add Coupon
      </button>
    </div>
  );
};

export default ResultManager;
