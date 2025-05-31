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

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
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

    const payload = await request.json();

    // Validate payload
    const validationResult = userInfoTemplateSchema.safeParse(payload);
    if (!validationResult.success) {
      return NextResponse.json(
        { error: validationResult.error.errors },
        { status: 400 }
      );
    }

    await connectDB();

    // Create update object with only the fields that are present in the payload
    const updateFields: Record<string, any> = {};
    if (payload.name !== undefined) updateFields.name = payload.name;
    if (payload.address !== undefined) updateFields.address = payload.address;
    if (payload.phone_number !== undefined)
      updateFields.phone_number = payload.phone_number;
    if (payload.email !== undefined) updateFields.email = payload.email;
    if (payload.isDefault !== undefined)
      updateFields.isDefault = payload.isDefault;

    // Update template with only the provided fields
    const updatedTemplate = await UserInfoTemplate.findOneAndUpdate(
      { _id: params.id },
      updateFields,
      { new: true }
    );

    if (!updatedTemplate) {
      return NextResponse.json(
        { error: "Template not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      id: updatedTemplate._id,
      name: updatedTemplate.name,
      address: updatedTemplate.address,
      phone_number: updatedTemplate.phone_number,
      isDefault: updatedTemplate.isDefault,
      email: updatedTemplate.email,
    });
  } catch (error) {
    console.error("Error updating template:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
