import { NextResponse } from "next/server";
import connectDB from "@/app/lib/mongodb";
import jwt from "jsonwebtoken";
import UserInfoTemplate from "@/app/models/UserInfoTemplate";
import { z } from "zod";

// Define validation schema
const userInfoTemplateSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email format"),
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

    // Check if we're requesting the default template
    const url = new URL(request.url);
    const defaultParam = url.searchParams.get("default");
    console.log("Default parameter:", defaultParam); // Debug log
    const isDefault = defaultParam === "true" || defaultParam === "1";

    if (isDefault) {
      console.log("Fetching default template for user:", decoded.userId); // Debug log
      // Get default template for the user
      const template = await UserInfoTemplate.findOne({
        user_id: decoded.userId,
        isDefault: true,
      });

      if (!template) {
        return NextResponse.json(
          { error: "Default template not found" },
          { status: 404 }
        );
      }

      return NextResponse.json({
        id: template._id,
        name: template.name,
        address: template.address,
        phone_number: template.phone_number,
        isDefault: template.isDefault,
        email: template.email,
      });
    }

    // Get all templates for the user
    const templates = await UserInfoTemplate.find({ user_id: decoded.userId });

    return NextResponse.json(
      templates.map((template) => ({
        id: template._id,
        name: template.name,
        address: template.address,
        phone_number: template.phone_number,
        isDefault: template.isDefault,
        email: template.email,
      }))
    );
  } catch (error) {
    console.error("Error fetching templates:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
