import connectDB from "@/app/lib/mongodb";
import User from "@/app/models/User";
import { UserPayer } from "@/app/models/UserPayer";
import { UserPayerAddress } from "@/app/models/UserPayerAddress";
import { UserPayerEmail } from "@/app/models/UserPayerEmail";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { name, email, address, userId } = await req.json();

    // Validate input

    if (!name || !email || !userId) {
      return NextResponse.json(
        { error: "Please provide email and company name" },
        { status: 400 }
      );
    }

    // Connect to database
    await connectDB();

    // Find user
    const user = await User.findOne({ _id: userId });

    if (!user) {
      return NextResponse.json({ error: "USER_NOT_EXISTED" }, { status: 400 });
    }

    const existedPayer = await UserPayer.findOne({ user_id: userId });

    if (existedPayer) {
      return new NextResponse(
        JSON.stringify({ message: "BUSINESS_ALREADY_EXISTED" }),
        {
          status: 400,
        }
      );
    }

    // Create new payer
    const [newPayer, newEmail, newAddress] = await Promise.all([
      UserPayer.create({
        user_id: userId,
        name,
      }),
      UserPayerEmail.create({
        user_id: userId,
        email,
      }),
      address
        ? UserPayerAddress.create({
            user_id: userId,
            address,
          })
        : true,
    ]);

    return NextResponse.json({
      message: "Business created successfully",
      payer: newPayer,
      email: newEmail,
      address: newAddress,
    });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
