import React, { useEffect } from "react";
import { FiImage, FiTrash, FiType } from "react-icons/fi";

const ResultManager = ({
  results,
  setResults,
  onSubmitCoupon,
  removeImage,
  handleImageUpload,
}) => {
  // Load results from localStorage only on the client side
  useEffect(() => {
    const storedResults = localStorage.getItem("coupons");
    if (storedResults) {
      setResults(JSON.parse(storedResults));
    }
  }, [setResults]);

  // Function to save results to localStorage
  const saveToLocalStorage = (newResults) => {
    localStorage.setItem("coupons", JSON.stringify(newResults));
  };

  const handleSubmitCoupons = async (e) => {
    e.preventDefault();

    try {
      for (const result of results) {
        const { message, details, expirationDate, imageUrl } = result;

        const response = await fetch("/api/coupons", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message,
            details,
            expirationDate,
            imageUrl,
          }),
        });

        const couponResult = await response.json();

        if (couponResult.error) {
          console.error(couponResult.error);
          alert("Failed to create coupon: " + couponResult.error);
          return;
        }

        // Call the onSubmitCoupon function to update the state in ResultPage
        onSubmitCoupon(result);
      }

      alert("Coupons created successfully!");

      // Reset results after successful submission
      setResults([
        { message: "", details: "", expirationDate: "", imageUrl: "" },
      ]);
      saveToLocalStorage([
        { message: "", details: "", expirationDate: "", imageUrl: "" },
      ]);
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while creating the coupons.");
    }
  };

  const handleMessageChange = (index, e) => {
    const newResults = [...results];
    newResults[index].message = e.target.value;
    setResults(newResults);
    saveToLocalStorage(newResults);
  };

  const handleDetailsChange = (index, e) => {
    const newResults = [...results];
    newResults[index].details = e.target.value;
    setResults(newResults);
    saveToLocalStorage(newResults);
  };

  const handleExpirationDateChange = (index, e) => {
    const newResults = [...results];
    newResults[index].expirationDate = e.target.value;
    setResults(newResults);
    saveToLocalStorage(newResults);
  };

  return (
    <div>
      <form onSubmit={handleSubmitCoupons}>
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
                />
              </div>
              <div className="flex mt-4">
                <FiType className="mt-2" />
                <textarea
                  value={result.details}
                  onChange={(e) => handleDetailsChange(index, e)}
                  className="flex-1 text-xl p-3 border border-gray-300 rounded-xl shadow-sm ml-2 pb-20"
                  placeholder="Enter coupon terms and conditions"
                  rows={3}
                  style={{ overflow: "hidden" }}
                />
              </div>
            </div>
          </div>
        ))}
        <button
          type="submit"
          className="mt-4 bg-green-500 text-white py-2 px-4 rounded-full hover:bg-green-600"
        >
          Submit Coupon
        </button>
      </form>
    </div>
  );
};

export default ResultManager;
