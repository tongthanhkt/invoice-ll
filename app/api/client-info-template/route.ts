import { NextResponse } from "next/server";
import connectDB from "@/app/lib/mongodb";
import jwt from "jsonwebtoken";
import ClientInfoTemplate from "@/app/models/ClientInfoTemplate";
import { z } from "zod";

// Define validation schema
const clientInfoTemplateSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email format"),
  user_id: z.string().min(1, "User ID is required"),
  address: z.string().optional(),
  phone_number: z.string().optional(),
  company_name: z.string().optional(),
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
    const validationResult = clientInfoTemplateSchema.safeParse(payload);
    if (!validationResult.success) {
      return NextResponse.json(
        { error: validationResult.error.errors },
        { status: 400 }
      );
    }

    const { name, address, phone_number, company_name, email } =
      validationResult.data;
    await connectDB();

    // Create new template
    const newTemplate = await ClientInfoTemplate.create({
      user_id: decoded.userId,
      name,
      address,
      phone_number,
      company_name,
      email,
    });

    return NextResponse.json({
      id: newTemplate._id,
      name: newTemplate.name,
      address: newTemplate.address,
      phone_number: newTemplate.phone_number,
      company_name: newTemplate.company_name,
      email: newTemplate.email,
      user_id: newTemplate.user_id,
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

    // Get all templates for the user
    const templates = await ClientInfoTemplate.find({
      user_id: decoded.userId,
    });

    return NextResponse.json(
      templates.map((template) => ({
        id: template._id,
        name: template.name,
        address: template.address,
        phone_number: template.phone_number,
        company_name: template.company_name,
        email: template.email,
        user_id: template.user_id,
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
