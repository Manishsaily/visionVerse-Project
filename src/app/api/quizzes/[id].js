// /api/quizzes/[id].js
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const { id } = params; // Extract the quiz ID from the request parameters

  if (!id) {
    return NextResponse.json({ error: "Quiz ID is required" }, { status: 400 });
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
            query ($id: Int!) {
              Quiz_by_pk(QuizID: $id) {
                Name
                IsLarge
                Layout
                BackgroundColor
                ButtonColor
                buttonStyle
                Questions {
                  QuestionID
                  QuestionText
                  Answers
                }
              }
            }
          `,
          variables: {
            id: parseInt(id, 10),
          },
        }),
      }
    );

    const data = await response.json();

    if (data.errors) {
      console.error("GraphQL errors:", data.errors);
      return NextResponse.json(
        { error: "Failed to fetch quiz" },
        { status: 500 }
      );
    }

    return NextResponse.json(data.data.Quiz_by_pk);
  } catch (error) {
    console.error("Network error:", error);
    return NextResponse.json(
      { error: "Failed to fetch quiz" },
      { status: 500 }
    );
  }
}
