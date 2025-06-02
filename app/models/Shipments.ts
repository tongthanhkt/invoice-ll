import mongoose from "mongoose";

const shipmentsSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    trim: true,
    lowercase: true,
  },

  // contact name
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
  },
  user_id: { type: String, require: true },
  address: { type: String },
  phone_number: { type: String },
  company_name: { type: String },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create and export the User Info Template model
export default mongoose.models.Shipments ||
  mongoose.model("Shipments", shipmentsSchema);
