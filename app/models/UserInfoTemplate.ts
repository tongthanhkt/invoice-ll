import mongoose from "mongoose";

const userInfoTemplateSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    trim: true,
    lowercase: true,
  },

  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
  },
  user_id: { type: String },
  address: { type: String },
  phone_number: { type: String },
  isDefault: { type: Boolean, default: false },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create and export the User Info Template model
export default mongoose.models.UserInfoTemplate ||
  mongoose.model("UserInfoTemplate", userInfoTemplateSchema);
