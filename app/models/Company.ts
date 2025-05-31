import mongoose from "mongoose";

const companySchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Email is required"],
    trim: true,
    lowercase: true,
  },
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
  },
  user_id: {
    type: String,
    required: [true, "User ID is required"],
  },
  address: { type: String },
  city: { type: String },
  zipcode: { type: String },
  phone_number: { type: String },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create and export the Company model
export default mongoose.models.Company ||
  mongoose.model("Company", companySchema);
