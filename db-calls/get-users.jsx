"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/users"); // Call your API route
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>My Items</h1>
      <ul>
        {users.map((user) => (
          <ul>
            {users.map((user) => (
              <li key={user.Username}>
                <li>{user.Username}</li>
                <li>{user.UserID}</li>
                <li>{user.Email}</li>
              </li>
            ))}
          </ul>
        ))}
      </ul>
    </div>
  );
}
