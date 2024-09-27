"use client";
import React, { useState } from "react";

export default function CreateUser() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password, email }),
      });

      const result = await response.json();
      if (result.error) {
        setMessage(`Error: ${result.error}`);
      } else {
        setMessage("User created successfully!");
        // Reset form fields if needed
        setUsername("");
        setPassword("");
        setEmail("");
      }
    } catch (error) {
      console.error("Error creating user:", error);
      setMessage("Error creating user.");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="w-1/3 p-4 bg-white border-r border-gray-300 rounded-xl text-black">
        <h1>Create User</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit">Create User</button>
        </form>
        {message && <p>{message}</p>}
      </div>
    </div>
  );
}
