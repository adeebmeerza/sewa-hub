import dbConnect, { dbDisconnect } from "@/lib/mongoDbConnect";
import seedCategories from "./seedCategory";
import seedProducts from "./seedProduct";
import { loadEnvConfig } from "@next/env";

const projectDir = process.cwd();
loadEnvConfig(projectDir);

async function seedDatabase() {
  try {
    await dbConnect();

    await seedCategories();
    await seedProducts();

    console.log("Database seeding completed");
  } catch (error) {
    console.log("Seeding failed", error);
  } finally {
    await dbDisconnect();
  }
}

seedDatabase();
