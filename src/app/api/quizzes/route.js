import { NextResponse } from "next/server";

// Handle GET requests
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 });
  }

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
          query: `
          query ($userId: Int!) {
            Quiz(where: { User_UserID: { _eq: $userId } }) {
              QuizID
              Layout
              BackgroundColor
              ButtonColor
            }
          }
        `,
          variables: {
            userId: parseInt(userId, 10),
          },
        }),
      }
    );

    const data = await response.json();

    if (data.errors) {
      console.error("GraphQL errors:", data.errors);
      return NextResponse.json(
        { error: "Failed to fetch quizzes" },
        { status: 500 }
      );
    }

    return NextResponse.json(data.data.Quiz);
  } catch (error) {
    console.error("Network error:", error);
    return NextResponse.json(
      { error: "Failed to fetch quizzes" },
      { status: 500 }
    );
  }
}

// Handle POST requests
export async function POST(request) {
  const { layout, backgroundColor, buttonColor, userId } = await request.json();

  // Get the current date in ISO format (YYYY-MM-DD)
  const dateCreated = new Date().toISOString().split("T")[0]; // Extract date part

  const payload = {
    query: `
      mutation InsertQuiz($layout: String!, $backgroundColor: String, $buttonColor: String, $userId: Int!, $dateCreated: date!) {
        insert_Quiz(objects: {
          Layout: $layout,
          BackgroundColor: $backgroundColor,
          ButtonColor: $buttonColor,
          User_UserID: $userId,
          DateCreated: $dateCreated
        }) {
          returning {
            QuizID
            Layout
          }
        }
      }
    `,
    variables: {
      layout,
      backgroundColor,
      buttonColor,
      userId: parseInt(userId, 10),
      dateCreated, // Use the date-only string
    },
  };

  console.log("Payload being sent to DB:", JSON.stringify(payload, null, 2));

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
        { error: "Failed to create quiz" },
        { status: 500 }
      );
    }

    return NextResponse.json(data.data.insert_Quiz.returning);
  } catch (error) {
    console.error("Network error:", error);
    return NextResponse.json(
      { error: "Failed to create quiz" },
      { status: 500 }
    );
  }
}
