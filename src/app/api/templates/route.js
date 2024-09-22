import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_HASURA_PROJECT_ENDPOINT,
      {
        method: "POST",
        headers: {
          "x-hasura-admin-secret": process.env.HASURA_ADMIN_SECRET,
        },
        body: JSON.stringify({
          query: `
          query {
            Template {
              TemplateID
              Name
            }
          }
        `,
        }),
      }
    );

    const data = await response.json();
    return NextResponse.json(data.data.Template);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch templates" },
      { status: 500 }
    );
  }
}
