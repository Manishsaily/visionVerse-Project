import { NextResponse } from "next/server";

// Handle GET requests
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 });
  }

  try {
    // Step 1: Fetch quizzes
    const quizResponse = await fetch(
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
                DateCreated
                IsLarge
                buttonStyle
                Name
              }
            }
          `,
          variables: {
            userId: parseInt(userId, 10),
          },
        }),
      }
    );

    const quizzesData = await quizResponse.json();

    if (quizzesData.errors) {
      console.error("GraphQL errors:", quizzesData.errors);
      return NextResponse.json(
        { error: "Failed to fetch quizzes" },
        { status: 500 }
      );
    }

    const quizzes = quizzesData.data.Quiz;

    // Step 2: Fetch questions for each quiz
    const quizzesWithQuestions = await Promise.all(
      quizzes.map(async (quiz) => {
        const questionsResponse = await fetch(
          process.env.NEXT_PUBLIC_HASURA_PROJECT_ENDPOINT,
          {
            method: "POST",
            headers: {
              "x-hasura-admin-secret": process.env.HASURA_ADMIN_SECRET,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              query: `
                query ($quizId: Int!) {
                  Question(where: { QuizID: { _eq: $quizId } }) {
                    QuestionID
                    QuestionText
                    Answers
                  }
                }
              `,
              variables: {
                quizId: quiz.QuizID,
              },
            }),
          }
        );

        const questionsData = await questionsResponse.json();
        if (questionsData.errors) {
          console.error("GraphQL errors:", questionsData.errors);
          return { ...quiz, Questions: [] }; // Return quiz with empty questions on error
        }

        return { ...quiz, Questions: questionsData.data.Question };
      })
    );

    return NextResponse.json(quizzesWithQuestions);
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
  const {
    layout,
    backgroundColor,
    buttonColor,
    userId,
    isLarge,
    buttonStyle,
    quizName,
  } = await request.json();

  // Get the current date in ISO format (YYYY-MM-DD)
  const dateCreated = new Date().toISOString().split("T")[0]; // Extract date part

  const payload = {
    query: `
      mutation InsertQuiz($layout: String!, $backgroundColor: String, $buttonColor: String, $userId: Int!, $dateCreated: date!, $isLarge: Boolean!, $buttonStyle: String!, $quizName: String) {
        insert_Quiz(objects: {
          Layout: $layout,
          BackgroundColor: $backgroundColor,
          ButtonColor: $buttonColor,
          User_UserID: $userId,
          IsLarge: $isLarge,
          buttonStyle: $buttonStyle
          DateCreated: $dateCreated
          Name: $quizName
        }) {
          returning {
            QuizID
            Layout
            Name
          }
        }
      }
    `,
    variables: {
      layout,
      backgroundColor,
      buttonColor,
      userId: parseInt(userId, 10),
      isLarge,
      buttonStyle,
      dateCreated, // Use the date-only string
      quizName,
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

// Handle PATCH requests for both quizzes and questions
export async function PATCH(request) {
  const { quizData, questionsToUpdate } = await request.json();

  // Update quiz data
  const { quizID, isLarge } = quizData;

  if (!quizID) {
    return NextResponse.json({ error: "Quiz ID is required" }, { status: 400 });
  }

  // Prepare the quiz update mutation
  const quizPayload = {
    query: `
      mutation UpdateQuiz($quizID: Int!, $isLarge: Boolean!) {
        update_Quiz(
          where: { QuizID: { _eq: $quizID } },
          _set: { IsLarge: $isLarge }
        ) {
          returning {
            QuizID
            IsLarge
          }
        }
      }
    `,
    variables: {
      quizID: parseInt(quizID, 10),
      isLarge,
    },
  };

  try {
    // Update the quiz
    const quizResponse = await fetch(
      process.env.NEXT_PUBLIC_HASURA_PROJECT_ENDPOINT,
      {
        method: "POST",
        headers: {
          "x-hasura-admin-secret": process.env.HASURA_ADMIN_SECRET,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(quizPayload),
      }
    );

    const quizData = await quizResponse.json();
    if (quizData.errors) {
      console.error("GraphQL errors:", quizData.errors);
      return NextResponse.json(
        { error: "Failed to update quiz" },
        { status: 500 }
      );
    }

    // Prepare to update questions
    const questionResponses = [];
    for (const { id, questionText, answers } of questionsToUpdate) {
      const questionPayload = {
        query: `
          mutation UpdateQuestion($id: Int!, $questionText: String!, $answers: [String!]) {
            update_Question(
              where: { QuestionID: { _eq: $id } },
              _set: {
                QuestionText: $questionText,
                Answers: $answers
              }
            ) {
              affected_rows
            }
          }
        `,
        variables: {
          id: parseInt(id, 10),
          questionText,
          answers: answers || [],
        },
      };

      const questionResponse = await fetch(
        process.env.NEXT_PUBLIC_HASURA_PROJECT_ENDPOINT,
        {
          method: "POST",
          headers: {
            "x-hasura-admin-secret": process.env.HASURA_ADMIN_SECRET,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(questionPayload),
        }
      );

      const questionData = await questionResponse.json();
      if (questionData.errors) {
        console.error("Error updating question:", questionData.errors);
        return NextResponse.json(
          { error: "Failed to update question" },
          { status: 500 }
        );
      }
      questionResponses.push(questionData.data.update_Question.affected_rows);
    }

    return NextResponse.json({
      quiz: quizData.data.update_Quiz.returning,
      questionsUpdated: questionResponses,
    });
  } catch (error) {
    console.error("Network error:", error);
    return NextResponse.json(
      { error: "Failed to update quiz and questions" },
      { status: 500 }
    );
  }
}

export async function DELETE(request) {
  const { quizId } = await request.json(); // Expecting JSON body

  if (!quizId) {
    return NextResponse.json({ error: "Quiz ID is required" }, { status: 400 });
  }

  try {
    const payload = {
      query: `
        mutation DeleteQuiz($quizId: Int!) {
          delete_Quiz(where: { QuizID: { _eq: $quizId } }) {
            affected_rows
          }
        }
      `,
      variables: {
        quizId: parseInt(quizId, 10),
      },
    };

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
        { error: "Failed to delete quiz" },
        { status: 500 }
      );
    }

    return NextResponse.json({ message: "Quiz deleted successfully" });
  } catch (error) {
    console.error("Network error:", error);
    return NextResponse.json(
      { error: "Failed to delete quiz" },
      { status: 500 }
    );
  }
}
