import { NextResponse } from "next/server";
import connectDB from "@/app/lib/mongodb";
import jwt from "jsonwebtoken";
import UserInfoTemplate from "@/app/models/UserInfoTemplate";
import { z } from "zod";

// Define validation schema
const userInfoTemplateSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email format"),
  user_id: z.string().min(1, "User ID is required"),
  address: z.string().optional(),
  phone_number: z.string().optional(),
  isDefault: z.boolean().default(false),
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
    const validationResult = userInfoTemplateSchema.safeParse(payload);
    if (!validationResult.success) {
      return NextResponse.json(
        { error: validationResult.error.errors },
        { status: 400 }
      );
    }

    const { name, address, phone_number, isDefault, email } =
      validationResult.data;
    await connectDB();

    // Create new template
    const newTemplate = await UserInfoTemplate.create({
      user_id: decoded.userId,
      name,
      address,
      phone_number,
      isDefault,
      email,
    });

    return NextResponse.json({
      id: newTemplate._id,
      name: newTemplate.name,
      address: newTemplate.address,
      phone_number: newTemplate.phone_number,
      isDefault: newTemplate.isDefault,
      email: newTemplate.email,
    });
  } catch (error) {
    console.error("Error creating template:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
