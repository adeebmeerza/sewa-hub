import mongoose from "mongoose";

export interface User extends mongoose.Document {
  name: string;
  email: string;
  password: string;
  avatar: string;
  role: "user" | "rentalOwner" | "admin";
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new mongoose.Schema<User>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: { type: String, default: "https://via.placeholder.com/150" },
    role: { type: String, default: "user" },
  },
  { timestamps: true }
);

UserSchema.index({ email: 1, password: 1 });

export default mongoose.models.User || mongoose.model<User>("User", UserSchema);
