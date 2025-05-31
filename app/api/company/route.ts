import { NextResponse } from "next/server";
import connectDB from "@/app/lib/mongodb";
import jwt from "jsonwebtoken";
import Company from "@/app/models/Company";
import { z } from "zod";

// Define validation schema
const companySchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email format"),
  user_id: z.string().min(1, "User ID is required"),
  address: z.string().optional(),
  city: z.string().optional(),
  id: z.string().optional(),
  zipcode: z.string().optional(),
  phone_number: z.string().optional(),
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
    const validationResult = companySchema.safeParse(payload);
    if (!validationResult.success) {
      return NextResponse.json(
        { error: validationResult.error.errors },
        { status: 400 }
      );
    }

    const { id, name, address, city, zipcode, phone_number, email } =
      validationResult.data;
    await connectDB();

    let company;
    if (id) {
      // Update existing company
      company = await Company.findOneAndUpdate(
        { _id: id, user_id: decoded.userId },
        {
          name,
          address,
          city,
          zipcode,
          phone_number,
          email,
        },
        { new: true }
      );

      if (!company) {
        return NextResponse.json(
          { error: "Company not found or unauthorized" },
          { status: 404 }
        );
      }
    } else {
      // Create new company
      company = await Company.create({
        user_id: decoded.userId,
        name,
        address,
        city,
        zipcode,
        phone_number,
        email,
      });
    }

    return NextResponse.json({
      id: company._id,
      name: company.name,
      address: company.address,
      city: company.city,
      zipcode: company.zipcode,
      phone_number: company.phone_number,
      email: company.email,
      user_id: company.user_id,
    });
  } catch (error) {
    console.error("Error handling company:", error);
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

    // Get all companies for the user
    const companies = await Company.find({ user_id: decoded.userId });

    return NextResponse.json(
      companies.map((company) => ({
        id: company._id,
        name: company.name,
        address: company.address,
        city: company.city,
        zipcode: company.zipcode,
        phone_number: company.phone_number,
        email: company.email,
        user_id: company.user_id,
      }))
    );
  } catch (error) {
    console.error("Error fetching companies:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
