import { PageType } from "@/enums";
import Category from "@/models/Category";
import Product from "@/models/Product";
import mongoose from "mongoose";

const seedProducts = async () => {
  console.log("Seeding products...");

  await Product.deleteMany({});
  console.log("Cleared old product data");

  const categories = await Category.find({});

  const categoriesIdLookup = categories.reduce<
    Record<string, mongoose.Types.ObjectId>
  >((acc, category) => {
    acc[category.slug] = category._id;
    return acc;
  }, {});

  const products = [
    {
      slug: "dslr-camera-canon",
      type: PageType.PRODUCT,
      name: "Canon EOS 90D DSLR Camera",
      description:
        "High-performance DSLR camera with 32.5 MP sensor, perfect for photography and video.",
      category: categoriesIdLookup["cameras"],
      images: [
        "https://example.com/images/canon-eos-90d-1.jpg",
        "https://example.com/images/canon-eos-90d-2.jpg",
      ],
      owner: new mongoose.Types.ObjectId(),
      location: {
        type: "Point",
        coordinates: [103.8198, 1.3521], // Example coordinates (Singapore)
      },
      rentalPrice: {
        perHour: 15,
        perDay: 100,
      },
      deposit: 200,
      availability: {
        startDate: new Date("2025-04-01"),
        endDate: new Date("2025-12-31"),
        unavailableDates: [new Date("2025-06-15"), new Date("2025-07-04")],
      },
      condition: "like new",
      status: "available",
    },
    {
      slug: "gaming-laptop-rog",
      type: PageType.PRODUCT,
      name: "ASUS ROG Zephyrus G14 Gaming Laptop",
      description:
        "High-end gaming laptop with Ryzen 9 processor and RTX 4060 GPU.",
      category: categoriesIdLookup["computers"],
      images: [
        "https://example.com/images/rog-zephyrus-1.jpg",
        "https://example.com/images/rog-zephyrus-2.jpg",
      ],
      owner: new mongoose.Types.ObjectId(),
      location: {
        type: "Point",
        coordinates: [-74.006, 40.7128], // Example coordinates (New York)
      },
      rentalPrice: {
        perDay: 50,
      },
      deposit: 500,
      availability: {
        startDate: new Date("2025-03-01"),
        endDate: new Date("2025-12-31"),
        unavailableDates: [new Date("2025-08-10"), new Date("2025-09-25")],
      },
      condition: "used",
      status: "available",
    },
    {
      _id: new mongoose.Types.ObjectId(),
      slug: "tent-outdoor-camping",
      type: PageType.PRODUCT,
      name: "Coleman Sundome Camping Tent",
      description:
        "Spacious and durable camping tent suitable for outdoor adventures.",
      category: categoriesIdLookup["camping-tents"],
      images: [
        "https://example.com/images/coleman-tent-1.jpg",
        "https://example.com/images/coleman-tent-2.jpg",
      ],
      owner: new mongoose.Types.ObjectId(),
      location: {
        type: "Point",
        coordinates: [-118.2437, 34.0522], // Example coordinates (Los Angeles)
      },
      rentalPrice: {
        perDay: 25,
      },
      deposit: 100,
      availability: {
        startDate: new Date("2025-05-01"),
        endDate: new Date("2025-12-31"),
        unavailableDates: [new Date("2025-07-20"), new Date("2025-08-15")],
      },
      condition: "like new",
      status: "available",
    },
    {
      _id: new mongoose.Types.ObjectId(),
      slug: "electric-scooter-xiaomi",
      type: PageType.PRODUCT,
      name: "Xiaomi Mi Electric Scooter Pro 2",
      description:
        "Portable and high-speed electric scooter with long battery life.",
      category: categoriesIdLookup["bicycles-scooters"],
      images: [
        "https://example.com/images/xiaomi-scooter-1.jpg",
        "https://example.com/images/xiaomi-scooter-2.jpg",
      ],
      owner: new mongoose.Types.ObjectId(),
      location: {
        type: "Point",
        coordinates: [51.5074, -0.1278], // Example coordinates (London)
      },
      rentalPrice: {
        perHour: 10,
        perDay: 40,
      },
      deposit: 150,
      availability: {
        startDate: new Date("2025-06-01"),
        endDate: new Date("2025-12-31"),
        unavailableDates: [new Date("2025-09-10"), new Date("2025-10-05")],
      },
      condition: "used",
      status: "available",
    },
  ];

  await Product.insertMany(products);
  console.log("Products seeded successfully");
};

export default seedProducts;
