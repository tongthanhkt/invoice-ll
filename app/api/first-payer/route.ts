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
      user_id: decoded.userId,
    }).sort({ createdAt: 1 });
    const firstPayerEmail = await UserPayerEmail.findOne({
      user_id: decoded.userId,
    }).sort({ createdAt: 1 });

    if (!firstPayer || !firstPayerEmail) {
      return NextResponse.json({
        payer: null,
        payerEmail: null,
        payerAddress: null,
      });
    }

    const firstPayerAddress = await UserPayerAddress.findOne({
      user_id: decoded.userId,
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

export async function PUT(request: Request) {
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

    const { payer, payerEmail, payerAddress } = await request.json();

    if (!payer?.name || !payerEmail?.email) {
      return NextResponse.json(
        { error: "Payer name and email are required" },
        { status: 400 }
      );
    }

    await connectDB();
    const existingEmail = await UserPayerEmail.findOne({
      email: payerEmail.email,
      user_id: decoded.userId,
    });

    if (existingEmail && existingEmail?._id?.toString() !== payerEmail.id) {
      return NextResponse.json(
        { error: "Email already exists" },
        { status: 400 }
      );
    }

    // Update payer information
    await Promise.all([
      payer.id
        ? UserPayer.findByIdAndUpdate(payer.id, { name: payer.name })
        : UserPayer.create({
            name: payer.name,
            user_id: decoded.userId,
          }),
      payerEmail.id
        ? UserPayerEmail.findByIdAndUpdate(payerEmail.id, {
            email: payerEmail.email,
          })
        : UserPayerEmail.create({
            user_id: decoded.userId,
            email: payerEmail.email,
          }),
      payerAddress?.id
        ? UserPayerAddress.findByIdAndUpdate(payerAddress.id, {
            address: payerAddress.address,
          })
        : payerAddress?.address
        ? UserPayerAddress.create({
            user_id: decoded.userId,
            address: payerAddress.address,
          })
        : Promise.resolve(),
    ]);

    return NextResponse.json({
      message: "First payer updated successfully",
    });
  } catch (error) {
    console.error("Error updating first payer:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
