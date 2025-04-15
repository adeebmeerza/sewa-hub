import mongoose from "mongoose";
import { PageType } from "../enums";

export interface ICategory extends mongoose.Document {
  name: string;
  slug: string;
  icon?: string;
  type: PageType.CATEGORY;
  parentCategory?: mongoose.Types.ObjectId | null;
  createdAt: Date;
  updatedAt: Date;
}

const CategorySchema = new mongoose.Schema<ICategory>(
  {
    name: {
      type: String,
      required: true,
      maxlength: [100, "Name cannot be more than 100 characters"],
      unique: true,
    },
    slug: {
      type: String,
      required: true,
      maxlength: [100, "Slug cannot be more than 100 characters"],
      unique: true,
    },
    type: {
      type: String,
      required: true,
      enum: [PageType.CATEGORY],
      default: PageType.CATEGORY,
    },
    icon: {
      type: String,
      required: false,
      nullable: true,
      default: null,
    },
    parentCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: false,
      nullable: true,
      default: null,
      index: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Category ||
  mongoose.model<ICategory>("Category", CategorySchema);
