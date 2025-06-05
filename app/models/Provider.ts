import mongoose from "mongoose";

const providerSchema = new mongoose.Schema({
  // contact name
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
  },
  user_id: { type: String, require: true },
  address: { type: String },
  phone_number: { type: String },
  email: { type: String },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create and export the User Info Template model
export default mongoose.models.Provider ||
  mongoose.model("Provider", providerSchema);
