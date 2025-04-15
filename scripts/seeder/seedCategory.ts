import mongoose from "mongoose";

import Category from "../../models/Category";
import { PageType } from "@/enums";
import RENTAL_CATEGORIES from "@/constants/rentalCategories";

interface CategoryItem {
  _id: mongoose.Types.ObjectId;
  name: string;
  slug: string;
  icon: string;
  type: PageType;
  parentCategory: string | null;
}

interface SubcategoryItem {
  name: string;
  slug: string;
  icon: string;
  type: PageType;
  parentCategory: string | mongoose.Types.ObjectId;
}

const seedCategories = async () => {
  console.log("Seeding categories...");

  // Clear existing data
  await Category.deleteMany({});
  console.log("Cleared old category data");

  const categories: CategoryItem[] = [];

  const subcategories: SubcategoryItem[] = [];

  RENTAL_CATEGORIES.forEach((category) => {
    const categoryItem = {
      _id: new mongoose.Types.ObjectId(),
      name: category.name,
      slug: category.slug,
      icon: category.icon,
      type: PageType.CATEGORY,
      parentCategory: null,
    };
    categories.push(categoryItem);

    category.subCategories.forEach((subcategory) => {
      const subcategoryItem = {
        name: subcategory.name,
        slug: subcategory.slug,
        icon: subcategory.icon,
        type: PageType.CATEGORY,
        parentCategory: categoryItem.slug,
      };
      subcategories.push(subcategoryItem);
    });
  });

  await Category.insertMany(categories);

  const insertedParentCategories = await Category.find({});

  const parentCategoryIdLookup = insertedParentCategories.reduce<
    Record<string, mongoose.Types.ObjectId>
  >((acc, category) => {
    acc[category.slug] = category._id;
    return acc;
  }, {} as { [key: string]: mongoose.Types.ObjectId });

  subcategories.forEach((subcategory) => {
    if (typeof subcategory.parentCategory === "string") {
      subcategory.parentCategory =
        parentCategoryIdLookup[subcategory.parentCategory];
    }
  });

  await Category.insertMany(subcategories);

  console.log("Categories seeded successfully");
};

export default seedCategories;
