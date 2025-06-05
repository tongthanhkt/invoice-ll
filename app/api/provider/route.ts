import { NextResponse } from "next/server";
import connectDB from "@/app/lib/mongodb";
import jwt from "jsonwebtoken";
import Provider from "@/app/models/Provider";
import { z } from "zod";

// Define validation schema
const providerSchema = z.object({
  name: z.string().min(1, "Name is required"),
  address: z.string().optional(),
  phone_number: z.string().optional(),
  email: z.string().optional(),
});

export async function POST(request: Request) {
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

    const payload = await request.json();

    // Validate payload
    const validationResult = providerSchema.safeParse(payload);
    if (!validationResult.success) {
      return NextResponse.json(
        { error: validationResult.error.errors },
        { status: 400 }
      );
    }

    const { name, address, phone_number, email } = validationResult.data;
    await connectDB();
    // Create new provider
    const newProvider = await Provider.create({
      user_id: decoded.userId,
      name,
      address,
      phone_number,
      email,
    });

    return NextResponse.json({
      id: newProvider._id,
      name: newProvider.name,
      address: newProvider.address,
      phone_number: newProvider.phone_number,
      email: newProvider.email,
      user_id: newProvider.user_id,
      createdAt: newProvider.createdAt,
    });
  } catch (error) {
    console.error("Error creating provider:", error);
    if (error instanceof Error) {
      console.error("Error details:", {
        name: error.name,
        message: error.message,
        stack: error.stack,
      });
    }
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

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

    // Get all providers for the user
    const providers = await Provider.find({
      user_id: decoded.userId,
    });

    return NextResponse.json(
      providers.map((provider) => ({
        id: provider._id,
        name: provider.name,
        address: provider.address,
        phone_number: provider.phone_number,
        email: provider.email,
        user_id: provider.user_id,
        createdAt: provider.createdAt,
      }))
    );
  } catch (error) {
    console.error("Error fetching providers:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
