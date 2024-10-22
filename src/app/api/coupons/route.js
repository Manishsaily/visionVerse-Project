import { NextResponse } from "next/server";

// Handle GET requests
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const quizId = searchParams.get("quizId");

  if (!quizId) {
    return NextResponse.json({ error: "Quiz ID is required" }, { status: 400 });
  }

  try {
    // Fetch coupons for the given quizId
    const couponResponse = await fetch(
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
              Coupon(where: { QuizID: { _eq: $quizId } }) {
                CouponID
                Message
                CouponDetails
                Expiry
                BackImage
                FrontImage
              }
            }
          `,
          variables: {
            quizId: parseInt(quizId, 10),
          },
        }),
      }
    );

    const couponsData = await couponResponse.json();

    if (couponsData.errors) {
      console.error("GraphQL errors:", couponsData.errors);
      return NextResponse.json(
        { error: "Failed to fetch coupons" },
        { status: 500 }
      );
    }

    return NextResponse.json(couponsData.data.Coupon);
  } catch (error) {
    console.error("Network error:", error);
    return NextResponse.json(
      { error: "Failed to fetch coupons" },
      { status: 500 }
    );
  }
}

// Handle POST requests
export async function POST(request) {
  const couponsData = await request.json(); // Expecting an array of coupon objects
  console.log("Incoming coupons data:", couponsData); // Log the incoming data
  if (!Array.isArray(couponsData)) {
    return NextResponse.json({ error: "Invalid data format" }, { status: 400 });
  }

  try {
    const responses = await Promise.all(
      couponsData.map(async (couponData) => {
        const {
          message,
          couponDetails,
          expirationDate,
          frontImageUrl,
          backImageUrl,
        } = couponData;

        // Check for required fields
        if (!message || !couponDetails || !expirationDate) {
          throw new Error("Missing required fields");
        }

        // Format the expiration date as "YYYY-MM-DD"
        const formattedExpirationDate = new Date(expirationDate)
          .toISOString()
          .split("T")[0];

        const payload = {
          query: `
          mutation InsertCoupon($message: String!, $couponDetails: String!, $expirationDate: date!) {
            insert_Coupon(objects: {
              Message: $message,
              CouponDetails: $couponDetails,
              Expiry: $expirationDate,
            }) {
              returning {
                CouponID
                Message
                CouponDetails
                Expiry
              }
            }
          }
        `,
          variables: {
            message,
            couponDetails,
            expirationDate: formattedExpirationDate,
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

        return data.data.insert_Coupon.returning;
      })
    );

    return NextResponse.json(responses);
  } catch (error) {
    console.error("Error inserting coupons:", error);
    return NextResponse.json(
      { error: error.message || "Failed to create coupons" },
      { status: 500 }
    );
  }
}

// Handle PATCH requests
export async function PATCH(request) {
  const { couponId, updateData } = await request.json();

  if (!couponId) {
    return NextResponse.json(
      { error: "Coupon ID is required" },
      { status: 400 }
    );
  }

  const payload = {
    query: `
      mutation UpdateCoupon($couponId: Int!, $updateData: coupon_set_input!) {
        update_Coupon(
          where: { CouponID: { _eq: $couponId } },
          _set: $updateData
        ) {
          returning {
            CouponID
            Message
            Details
            Expiry
            BackImage
            FrontImage
          }
        }
      }
    `,
    variables: {
      couponId: parseInt(couponId, 10),
      updateData,
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
        { error: "Failed to update coupon" },
        { status: 500 }
      );
    }

    return NextResponse.json(data.data.update_Coupon.returning);
  } catch (error) {
    console.error("Network error:", error);
    return NextResponse.json(
      { error: "Failed to update coupon" },
      { status: 500 }
    );
  }
}

// Handle DELETE requests
export async function DELETE(request) {
  const { couponId } = await request.json(); // Expecting JSON body

  if (!couponId) {
    return NextResponse.json(
      { error: "Coupon ID is required" },
      { status: 400 }
    );
  }

  try {
    const payload = {
      query: `
        mutation DeleteCoupon($couponId: Int!) {
          delete_Coupon(where: { CouponID: { _eq: $couponId } }) {
            affected_rows
          }
        }
      `,
      variables: {
        couponId: parseInt(couponId, 10),
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
        { error: "Failed to delete coupon" },
        { status: 500 }
      );
    }

    return NextResponse.json({ message: "Coupon deleted successfully" });
  } catch (error) {
    console.error("Network error:", error);
    return NextResponse.json(
      { error: "Failed to delete coupon" },
      { status: 500 }
    );
  }
}
