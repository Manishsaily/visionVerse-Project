import { NextResponse } from "next/server";

// Handle GET requests to fetch questions
export async function GET(request) {
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
            query {
              Question {
                QuestionID
                QuestionText
                Answers
              }
            }
          `,
        }),
      }
    );

    const data = await response.json();

    if (data.errors) {
      console.error("GraphQL errors:", data.errors);
      return NextResponse.json(
        { error: "Failed to fetch questions" },
        { status: 500 }
      );
    }

    return NextResponse.json(data.data.Question);
  } catch (error) {
    console.error("Network error:", error);
    return NextResponse.json(
      { error: "Failed to fetch questions" },
      { status: 500 }
    );
  }
}

// Handle POST requests to add a new question
export async function POST(request) {
  const questions = await request.json();

  const responses = [];
  for (const { questionText, quizId, answers } of questions) {
    const payload = {
      query: `
            mutation InsertQuestion($questionText: String!, $quizId: Int!, $answers: [String!]) {
              insert_Question(objects: {
                QuestionText: $questionText,
                QuizID: $quizId,
                Answers: $answers
              }) {
                returning {
                  QuestionID
                  QuestionText
                  Answers
                }
              }
            }
          `,
      variables: {
        questionText, // This should be a single string
        quizId,
        answers: answers || [], // This is an array of strings
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
        throw new Error(data.errors.map((err) => err.message).join(", "));
      }
      responses.push(data.data.insert_Question.returning);
    } catch (error) {
      console.error("Error inserting question:", error);
      return NextResponse.json(
        { error: "Failed to create question" },
        { status: 500 }
      );
    }
  }

  return NextResponse.json(responses);
}
