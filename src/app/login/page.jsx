"use client";

import React, { useState } from "react";
import { FaUser, FaLock, FaEnvelope, FaSignInAlt, FaUserPlus } from "react-icons/fa"; 

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true); // Toggle between login and signup
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  // Handle form submission for login/signup
  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = isLogin ? "/api/users" : "/api/users"; 

    try {
      const response = await fetch(url, {
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
        setMessage(isLogin ? "Logged in successfully!" : "User created successfully!");
        // Reset form fields if needed
        setUsername("");
        setPassword("");
        setEmail("");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage(`Error: ${isLogin ? "Login" : "Signup"} failed.`);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100 items-center justify-center">
      <div className="w-full max-w-2xl p-12 bg-white shadow-lg rounded-2xl border border-gray-300">
        {/* Toggle between login and signup */}
        <div className="flex justify-center mb-10">
          <button
            className={`px-6 py-2 font-semibold text-lg ${
              isLogin ? "bg-blue-600 text-white" : "text-gray-500"
            } rounded-l-lg transition-all duration-300`}
            onClick={() => setIsLogin(true)}
          >
            <FaSignInAlt className="inline mr-2" /> Login
          </button>
          <button
            className={`px-6 py-2 font-semibold text-lg ${
              !isLogin ? "bg-blue-600 text-white" : "text-gray-500"
            } rounded-r-lg transition-all duration-300`}
            onClick={() => setIsLogin(false)}
          >
            <FaUserPlus className="inline mr-2" /> Sign Up
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Username input */}
          <div className="relative">
            <FaUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
            />
          </div>

          {/* Password input */}
          <div className="relative">
            <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
            />
          </div>

          {/* Email input - only show in signup mode */}
          {!isLogin && (
            <div className="relative">
              <FaEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
              />
            </div>
          )}

          {/* Submit button */}
          <button
            type="submit"
            className="w-full py-4 px-6 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
          >
            {isLogin ? "Log In" : "Sign Up"}
          </button>
        </form>

        {/* Success/Error message */}
        {message && (
          <p className={`mt-8 text-center text-lg ${message.includes("Error") ? "text-red-600" : "text-green-600"}`}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
}
