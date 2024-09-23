"use client";
import React, { useEffect, useState } from "react";

export default function StylePage() {
  const [templates, setTemplates] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [templateId, setTemplateId] = useState("");

  // Fetch templates when the component mounts
  useEffect(() => {
    // Hardcoded templates for testing
    const hardcodedTemplates = [
      { TemplateID: 1, Name: "Template 1" },
      { TemplateID: 2, Name: "Template 2" },
      { TemplateID: 3, Name: "Template 3" },
      { TemplateID: 4, Name: "Template 4" },
    ];
    setTemplates(hardcodedTemplates);
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = 1; // Replace with the actual user ID

    try {
      const response = await fetch("/api/quizzes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          description,
          templateId: parseInt(templateId, 10),
          userId,
        }), // Ensure templateId is sent as an integer
      });

      const result = await response.json();

      // Handle response
      if (result.error) {
        console.error(result.error);
        alert("Failed to create quiz: " + result.error); // Display error
      } else {
        alert("Quiz created successfully!");
        // Reset form fields
        setName("");
        setDescription("");
        setTemplateId("");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while creating the quiz."); // Display error
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="w-1/3 p-4 bg-white border-r border-gray-300 rounded-xl text-black">
        <form onSubmit={handleSubmit}>
          <h1>Create a Quiz</h1>
          <input
            type="text"
            placeholder="Quiz Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="border p-1 rounded w-full mb-2"
          />
          <textarea
            placeholder="Quiz Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="border p-1 rounded w-full mb-2"
          />
          <select
            value={templateId}
            onChange={(e) => setTemplateId(e.target.value)}
            required
            className="border p-1 rounded w-full mb-2"
          >
            <option value="">Select Template</option>
            {templates.map((template) => (
              <option key={template.TemplateID} value={template.TemplateID}>
                {template.Name}
              </option>
            ))}
          </select>
          <button
            type="submit"
            className="mt-4 p-2 bg-blue-500 text-white rounded"
          >
            Create Quiz
          </button>
        </form>
      </div>
    </div>
  );
}
