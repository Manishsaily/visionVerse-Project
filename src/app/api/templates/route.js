import { NextResponse } from "next/server";

// Fetching templates
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
          query: `
          query {
            Template {
              TemplateID
              Name
              IsLarge
              Layout
              Colour
            }
          }
          `,
        }),
      }
    );

    const data = await response.json();

    // Check for errors in the response
    if (!response.ok || data.errors) {
      throw new Error(
        data.errors ? data.errors[0].message : "Failed to fetch templates"
      );
    }

    return NextResponse.json(data.data.Template);
  } catch (error) {
    console.error("GET Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch templates" },
      { status: 500 }
    );
  }
}

// Creating a new template
export async function POST(req) {
  const body = await req.json();
  const { Name, IsLarge, Layout, Colour, Number } = body;

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
  mutation {
    insert_Template(objects: { 
      Name: "${Name}", 
      IsLarge: ${IsLarge}, 
      Layout: "${Layout}",
      Colour: ${Colour !== undefined ? Colour : null} 
    }) {
      returning {
        TemplateID
        Name
        IsLarge
        Layout
        Colour
      }
    }
  }
  `,
        }),
      }
    );

    const data = await response.json();

    // Check for errors in the response
    if (!response.ok || data.errors) {
      throw new Error(
        data.errors ? data.errors[0].message : "Failed to create template"
      );
    }

    return NextResponse.json(data.data.insert_Template.returning);
  } catch (error) {
    console.error("POST Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to create template" },
      { status: 500 }
    );
  }
}
