import React from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { FiTrash, FiImage, FiType } from "react-icons/fi";

const TemplateManager = ({
  templates,
  addNewTemplate,
  removeTemplate,
  handleQuestionChange,
  handleImageUpload,
  removeImage,
  handleAnswerChange,
}) => {
  return (
    <div>
      {templates.map((template, templateIndex) => (
        <div
          key={templateIndex}
          className="flex mb-6 bg-white rounded-lg shadow-md"
        >
          <div className="mr-5 bg-gray-200 p-5 flex flex-col space-y-2">
            <button type="button" onClick={addNewTemplate}>
              <AiOutlinePlus size={20} />
            </button>
            <button
              type="button"
              onClick={() => removeTemplate(templateIndex)}
              className="pt-4"
            >
              <FiTrash size={20} />
            </button>
          </div>

          {/* Template Content */}
          <div className="flex-1 m-3">
            {/* Question Input */}
            <div className="flex items-center">
              <FiType />
              <input
                type="text"
                value={template.question}
                onChange={(userChange) =>
                  handleQuestionChange(templateIndex, userChange)
                }
                className="w-full mb-2 text-xl p-3 border border-gray-300 rounded-full shadow-sm ml-2"
                placeholder={`Question ${templateIndex + 1}`}
              />
            </div>

            {/* Image Upload Section */}
            <h1>Select a header image:</h1>
            <div className="flex items-center mb-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <FiImage />
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(templateIndex, e)}
                  className="border rounded-full p-2 w-full"
                />
              </label>

              {template.imageUrl && (
                <button
                  type="button"
                  onClick={() => removeImage(templateIndex)}
                  className="ml-2 bg-red-500 text-white py-2 px-4 flex items-center gap-2 rounded-full hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
                >
                  <FiTrash />
                  Remove Image
                </button>
              )}
            </div>

            {template.imageUrl && (
              <img
                src={template.imageUrl}
                alt={`Uploaded Preview ${templateIndex}`}
                className="w-full h-32 object-cover rounded-lg mb-2"
              />
            )}

            {/* Answer Inputs */}
            {template.answers.map((answer, answerIndex) => (
              <div key={answerIndex} className="flex items-center mb-2">
                <input
                  type="text"
                  value={answer}
                  onChange={(userChange) =>
                    handleAnswerChange(templateIndex, answerIndex, userChange)
                  }
                  className="flex-1 text-xl p-3 border border-gray-300 rounded-full shadow-sm"
                  placeholder={`Answer ${answerIndex + 1}`}
                />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TemplateManager;
