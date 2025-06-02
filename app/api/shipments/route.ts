import { NextResponse } from "next/server";
import connectDB from "@/app/lib/mongodb";
import jwt from "jsonwebtoken";
import Shipments from "@/app/models/Shipments";
import { z } from "zod";

// Define validation schema
const shipmentSchema = z.object({
  name: z.string().min(1, "Name is required"),
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
    const validationResult = shipmentSchema.safeParse(payload);
    if (!validationResult.success) {
      return NextResponse.json(
        { error: validationResult.error.errors },
        { status: 400 }
      );
    }

    const { name, address, phone_number, company_name } = validationResult.data;
    await connectDB();
    // Create new template
    const newShipment = await Shipments.create({
      user_id: decoded.userId,
      name,
      address,
      phone_number,
      company_name,
    });

    return NextResponse.json({
      id: newShipment._id,
      name: newShipment.name,
      address: newShipment.address,
      phone_number: newShipment.phone_number,
      company_name: newShipment.company_name,
      user_id: newShipment.user_id,
    });
  } catch (error) {
    console.error("Error creating shipment:", error);
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
    const shipments = await Shipments.find({
      user_id: decoded.userId,
    });

    return NextResponse.json(
      shipments.map((shipment) => ({
        id: shipment._id,
        name: shipment.name,
        address: shipment.address,
        phone_number: shipment.phone_number,
        company_name: shipment.company_name,
        user_id: shipment.user_id,
      }))
    );
  } catch (error) {
    console.error("Error fetching shipments:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
