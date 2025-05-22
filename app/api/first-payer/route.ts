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

    // Update payer information
    await Promise.all([
      UserPayer.findByIdAndUpdate(payer.id, { name: payer.name }),
      UserPayerEmail.findByIdAndUpdate(payerEmail.id, {
        email: payerEmail.email,
      }),
      payerAddress?.id
        ? UserPayerAddress.findByIdAndUpdate(payerAddress.id, {
            address: payerAddress.address,
          })
        : payerAddress?.address
        ? UserPayerAddress.create({
            userId: decoded.userId,
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
