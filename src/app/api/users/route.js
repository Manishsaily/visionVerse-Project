import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_HASURA_PROJECT_ENDPOINT,
      {
        method: "POST",
        headers: {
          "x-hasura-admin-secret": process.env.HASURA_ADMIN_SECRET,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: `query {
            User {
              Username
              UserID
              Email
            }
          }`,
        }),
      }
    );

    const data = await response.json();
    return NextResponse.json(data.data.User);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    );
  }
}

// Handle POST requests for user creation
export async function POST(request) {
  const { username, password, email } = await request.json();

  const payload = {
    query: `
      mutation CreateUser($username: String!, $password: String!, $email: String!, $creationDate: date!) {
        insert_User(objects: { Username: $username, Password: $password, Email: $email, CreationDate: $creationDate }) {
          returning {
            UserID
            Username
            Email
          }
        }
      }
    `,
    variables: {
      username,
      password,
      email,
      creationDate: new Date().toISOString(), // Set the creation date to the current date
    },
  };

  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_HASURA_PROJECT_ENDPOINT,
      {
        method: "POST",
        headers: {
          "x-hasura-admin-secret": process.env.HASURA_ADMIN_SECRET,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );

    const data = await response.json();

    if (data.errors) {
      console.error("GraphQL errors:", data.errors);
      return NextResponse.json(
        { error: "Failed to create user" },
        { status: 500 }
      );
    }

    return NextResponse.json(data.data.insert_User.returning);
  } catch (error) {
    console.error("Network error:", error);
    return NextResponse.json(
      { error: "Failed to create user" },
      { status: 500 }
    );
  }
}
