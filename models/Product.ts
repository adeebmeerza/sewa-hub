import mongoose, { Schema } from "mongoose";
import { PageType } from "../enums";

export interface IProduct extends mongoose.Document {
  slug: string;
  type: PageType.Product;
  name: string;
  description: string;
  category: string;
  images: string[];
  owner: mongoose.Types.ObjectId;
  location: {
    type: "Point";
    coordinates: [number, number];
  };
  rentalPrice: {
    perHour?: number;
    perDay?: number;
  };
  deposit?: number; // Security deposit
  availability: {
    startDate: Date;
    endDate: Date;
    unavailableDates: Date[];
  };
  condition: "new" | "like new" | "used" | "damaged";
  status: "available" | "rented" | "maintenance";
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema = new mongoose.Schema<IProduct>(
  {
    slug: {
      type: String,
      required: true,
      maxlength: [100, "Slug cannot be more than 100 characters"],
      unique: true,
      index: true,
    },
    type: {
      type: String,
      required: true,
      enum: [PageType.Product],
      default: PageType.Product,
    },
    name: {
      type: String,
      required: true,
      maxlength: [100, "Name cannot be more than 100 characters"],
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    images: {
      type: [String],
      required: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    location: {
      type: {
        type: String,
        enum: ["Point"],
        required: true,
        default: "Point",
      },
      coordinates: {
        type: [Number],
        required: true,
      },
    },
    rentalPrice: {
      perHour: {
        type: Number,
        min: 0,
      },
      perDay: {
        type: Number,
        min: 0,
      },
    },
    deposit: {
      type: Number,
      min: 0,
    }, // Security deposit
    availability: {
      startDate: { type: Date, required: true },
      endDate: { type: Date, required: true },
      unavailableDates: [{ type: Date }],
    },
    condition: {
      type: String,
      enum: ["new", "like new", "used", "damaged"],
      required: true,
    },
    status: {
      type: String,
      enum: ["available", "rented", "maintenance"],
      required: true,
      index: true,
    },
  },
  { timestamps: true }
);

ProductSchema.index({ location: "2dsphere" });

export default mongoose.models.Product ||
  mongoose.model<IProduct>("Product", ProductSchema);
