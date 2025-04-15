"use client";

import DynamicFilters, {
  SearchFiltersType,
} from "@/components/dynamic-filters";
import { Suspense } from "react";

// Example with multiple filter types
const searchFilters: SearchFiltersType = {
  filters: {
    categories: {
      type: "multiSelect",
      options: ["Electronics", "Clothing", "Home", "Sports", "Books"],
    },
    brands: {
      type: "multiSelect",
      options: [
        { value: "apple", label: "Apple" },
        { value: "samsung", label: "Samsung" },
        { value: "nike", label: "Nike" },
        { value: "adidas", label: "Adidas" },
        { value: "sony", label: "Sony" },
      ],
    },
    priceRange: {
      type: "rangeSlider",
      min: 0,
      max: 1000,
      step: 10,
      defaultMin: 0,
      defaultMax: 500,
    },
    ratings: {
      type: "starRating",
      options: [5, 4, 3, 2, 1],
    },
    distance: {
      type: "distance",
      options: [
        { radius: "5", label: "Within 5 miles" },
        { radius: "10", label: "Within 10 miles" },
        { radius: "25", label: "Within 25 miles" },
        { radius: "50", label: "Within 50 miles" },
      ],
    },
    gender: {
      type: "singleSelect",
      options: ["Men", "Women", "Unisex"],
    },
  },
  sortBy: ["Featured", "Price: Low to High", "Price: High to Low", "Newest"],
};

// const searchFiltersWithDistance: SearchFiltersType = {
//   filters: {
//     categories: {
//       type: "multiSelect",
//       options: ["Category 1", "Category 2", "Category 3"],
//     },
//     distance: {
//       type: "distance",
//       options: [
//         { radius: "2", label: "Walking distance" },
//         { radius: "5", label: "Local area" },
//         { radius: "10", label: "Short drive" },
//         { radius: "20", label: "Nearby town" },
//         { radius: "50", label: "Nearby district" },
//         { radius: "75", label: "Nearby region" },
//         { radius: "200", label: "National coverage" },
//       ],
//     },
//     brands: {
//       type: "singleSelect",
//       options: ["DJI", "Parrot", "Skydio", "XAG"],
//     },
//   },
//   sortBy: ["Relevance", "Price: Low to High", "Price: High to Low"],
// };

// const simpleSearchFilters: SearchFiltersType = {
//   filters: {
//     categories: {
//       type: "multiSelect",
//       options: ["Category 1", "Category 2", "Category 3"],
//     },
//     brands: {
//       type: "singleSelect",
//       options: ["DJI", "Parrot", "Skydio", "XAG"],
//     },
//   },
//   sortBy: ["Relevance", "Price: Low to High", "Price: High to Low"],
// };

const Page = () => {
  return (
    <Suspense>
      <main className="wrapper flex flex-col md:flex-row gap-4 py-4">
        <div className="grid md:grid-cols-[250px_1fr] gap-8 w-full">
          <aside>
            <DynamicFilters
              searchFilters={searchFilters}
              onFilterChange={(filters, sortBy) => {
                console.log("Filters changed:", filters);
                console.log("Sort by:", sortBy);
              }}
            />
          </aside>
          <div className="bg-muted/20 w-full">
            <h1 className="text-2xl font-bold mb-0">Result</h1>
            <p className="text-muted-foreground mt-0">
              Try selecting some filters and applying them to see updated
              results
            </p>
          </div>
        </div>
      </main>
    </Suspense>
  );
};

export default Page;
