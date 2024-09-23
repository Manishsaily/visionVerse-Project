"use client";
import React, { useState } from "react";

export default function StylePage() {
  const [name, setName] = useState("");
  const [number, setNumber] = useState(1);
  const [isLarge, setIsLarge] = useState(false);
  const [layout, setLayout] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMessage("");

    // Validate TemplateID
    if (number < 1 || number > 4) {
      setError("TemplateID must be between 1 and 4.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/templates", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Number: number,
          Name: name,
          IsLarge: isLarge,
          Layout: layout,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create template");
      }

      const data = await response.json();
      setSuccessMessage("Template created successfully!");
      // Clear form fields
      setNumber(1); // Reset to default
      setName("");
      setIsLarge(false);
      setLayout("");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="w-1/3 p-4 bg-white border-r border-gray-300 rounded-xl text-black">
        <h1>Style Page</h1>
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
          <h1>Create New Template</h1>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col w-1/3 p-4 bg-white border border-gray-300 rounded-xl"
          >
            <label>
              Number:
              <input
                type="number"
                value={number}
                onChange={(e) => setNumber(Number(e.target.value))}
                min="1"
                max="4"
                required
                className="border p-1 rounded w-full"
              />
            </label>
            <label>
              Name:
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="border p-1 rounded w-full"
              />
            </label>
            <label>
              Is Large:
              <input
                type="checkbox"
                checked={isLarge}
                onChange={(e) => setIsLarge(e.target.checked)}
              />
            </label>
            <label>
              Layout:
              <input
                type="text"
                value={layout}
                onChange={(e) => setLayout(e.target.value)}
                required
                className="border p-1 rounded w-full"
              />
            </label>
            <button
              type="submit"
              disabled={loading}
              className="mt-4 p-2 bg-blue-500 text-white rounded"
            >
              {loading ? "Creating..." : "Create Template"}
            </button>
          </form>
          {error && <div className="mt-4 text-red-500">{error}</div>}
          {successMessage && (
            <div className="mt-4 text-green-500">{successMessage}</div>
          )}
        </div>
      </div>
    </div>
  );
}
