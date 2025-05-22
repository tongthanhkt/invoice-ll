import { NextResponse } from "next/server";
import { UserPayer } from "@/app/models/UserPayer";
import connectDB from "@/app/lib/mongodb";
import jwt from "jsonwebtoken";
import { UserPayerEmail } from "@/app/models/UserPayerEmail";
import { UserPayerAddress } from "@/app/models/UserPayerAddress";

export async function GET(request: Request) {
  try {
    // Get token from cookies
    const token = request.headers
      .get("cookie")
      ?.split(";")
      .find((c) => c.trim().startsWith("token="))
      ?.split("=")[1];

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Verify token
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "your-secret-key"
    ) as { userId: string };

    await connectDB();

    const firstPayer = await UserPayer.findOne({
      userId: decoded.userId,
    }).sort({ createdAt: 1 });
    const firstPayerEmail = await UserPayerEmail.findOne({
      userId: decoded.userId,
    }).sort({ createdAt: 1 });

    if (!firstPayer || !firstPayerEmail) {
      return new NextResponse(
        JSON.stringify({ message: "NO_PAYER_OR_PAYER_EMAIL_FOUND" }),
        {
          status: 400,
        }
      );
    }

    const firstPayerAddress = await UserPayerAddress.findOne({
      userId: decoded.userId,
    }).sort({ createdAt: 1 });

    return NextResponse.json({
      payer: firstPayer,
      payerEmail: firstPayerEmail,
      payerAddress: firstPayerAddress,
    });
  } catch (error) {
    console.error("Error fetching payers:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
