"use client";
import React, { useEffect, useState } from "react";

export default function StylePage() {
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const response = await fetch("/api/templates"); // Adjust the API endpoint if necessary
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setTemplates(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTemplates();
  }, []);

  if (loading) {
    return <div>Loading templates...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="w-1/3 p-4 bg-white border-r border-gray-300 rounded-xl text-black">
        <h1>Style Page</h1>
        <ul>
          {templates.map((template) => (
            <li key={template.TemplateID}>
              <h3>{template.Name}</h3>
              <p>Layout: {template.Layout}</p>
              <p>Is Large: {template.IsLarge ? "Yes" : "No"}</p>
              <p>Colour: {template.Colour}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
