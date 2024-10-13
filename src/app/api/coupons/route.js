import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const couponData = await request.json();

    console.log("Received coupon data:", couponData);

    const {
      message,
      couponDetails, // Change this to match the incoming data
      expirationDate, // Get expiration date from couponData
      imageUrl,
    } = couponData;

    // Assuming the date should be formatted as "YYYY-MM-DD"
    const formattedExpirationDate = new Date(expirationDate)
      .toISOString()
      .split("T")[0];

    const payload = {
      query: `
        mutation InsertCoupon( $message: String!, $details: String!, $expirationDate: date!, $imageUrl: String) {
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
        message,
        details: couponDetails,
        expirationDate: formattedExpirationDate, // Use formatted date
        imageUrl,
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
      throw new Error(data.errors.map((err) => err.message).join(", "));
    }

    return NextResponse.json(data.data.insert_Coupon.returning);
  } catch (error) {
    console.error("Error inserting coupon:", error);
    return NextResponse.json(
      { error: "Failed to create coupon" },
      { status: 500 }
    );
  }
}
