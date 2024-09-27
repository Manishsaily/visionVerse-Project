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
              Name
              Description
              DateCreated
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
  const { name, description, templateId, userId } = await request.json();

  const payload = {
    query: `
      mutation InsertQuiz($name: String!, $description: String!, $templateId: Int!, $userId: Int!) {
        insert_Quiz(objects: {
          Name: $name,
          Description: $description,
          DateCreated: "${new Date().toISOString()}",
          TemplateID: $templateId,
          User_UserID: $userId
        }) {
          returning {
            QuizID
            Name
          }
        }
      }
    `,
    variables: {
      name,
      description,
      templateId: parseInt(templateId, 10),
      userId: parseInt(userId, 10),
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
