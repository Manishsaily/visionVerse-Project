"use client";
import React from "react";
import { useEffect, useState } from "react";

export default function StylePage() {
  const [templates, setTemplates] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [templateId, setTemplateId] = useState("");

  useEffect(() => {
    const fetchTemplates = async () => {
      const response = await fetch("/api/templates");
      const data = await response.json();
      setTemplates(data);
    };

    fetchTemplates();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = 1; // Replace with the actual user ID
    try {
      const response = await fetch("/api/quizzes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, description, templateId, userId }),
      });
      const result = await response.json();
      console.log(result);
      // Handle success (e.g., show a message or redirect)
      if (result.error) {
        // Handle error
        console.error(result.error);
      } else {
        // Quiz created successfully
        alert("Quiz created successfully!");
        // Reset form fields if needed
        setName("");
        setDescription("");
        setTemplateId("");
      }
    } catch (error) {
      console.error(error);
      console.log();
      // Handle error
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
          />
          <textarea
            placeholder="Quiz Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <select
            value={templateId}
            onChange={(e) => setTemplateId(e.target.value)}
            required
          >
            <option value="">Select Template</option>
            {templates.map((template) => (
              <option key={template.TemplateID} value={template.TemplateID}>
                {template.Name}
              </option>
            ))}
          </select>
          <button type="submit">Create Quiz</button>
        </form>
      </div>
    </div>
  );
}
