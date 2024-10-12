import { NextResponse } from "next/server";

// Handle GET requests to fetch coupons
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
              Coupon {
                CouponID
                Message
                Details
                Expiry
                ImageUrl
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
        { error: "Failed to fetch coupons" },
        { status: 500 }
      );
    }

    return NextResponse.json(data.data.Coupon);
  } catch (error) {
    console.error("Network error:", error);
    return NextResponse.json(
      { error: "Failed to fetch coupons" },
      { status: 500 }
    );
  }
}

// Handle POST requests to add a new coupon
export async function POST(request) {
  const couponData = await request.json();

  const responses = [];
  for (const {
    userId,
    message,
    details,
    expirationDate,
    imageUrl,
  } of couponData) {
    const payload = {
      query: `
            mutation InsertCoupon($userId: Int!, $message: String!, $details: String!, $expirationDate: String, $imageUrl: String) {
              insert_Coupon(objects: {
                Message: $message,
                Details: $details,
                Expiry: $expirationDate,
                ImageUrl: $imageUrl
              }) {
                returning {
                  CouponID
                  Message
                  Details
                  Expiry
                  ImageUrl
                }
              }
            }
          `,
      variables: {
        userId,
        message,
        details,
        expirationDate,
        imageUrl,
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
      responses.push(data.data.insert_Coupon.returning);
    } catch (error) {
      console.error("Error inserting coupon:", error);
      return NextResponse.json(
        { error: "Failed to create coupon" },
        { status: 500 }
      );
    }
  }

  return NextResponse.json(responses);
}
