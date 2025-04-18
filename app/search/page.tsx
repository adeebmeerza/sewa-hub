"use client";

import { ItemProps } from "@/components/ItemCard";
import DynamicFilters from "@/components/search-box/dynamic-filters";
import Sort from "@/components/search-box/sort";
import SearchResult from "@/components/search-result";
import { itemsData } from "@/constants/search";

import { Suspense } from "react";
import SearchProvider from "@/components/search-box/search-provider";
import { FiltersObject } from "../types/filters";

const searchResults: ItemProps[] = itemsData;
const sortBy = [
  "Featured",
  "Price: Low to High",
  "Price: High to Low",
  "Newest",
];
// Example with multiple filter types
const searchFilters: FiltersObject = {
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
    <SearchProvider>
      <Suspense>
        <main className="wrapper flex flex-col md:flex-row gap-4 py-4">
          <div className="grid md:grid-cols-[150px_1fr] lg:grid-cols-[200px_1fr] gap-8 w-full">
            <aside className="hidden md:block">
              <DynamicFilters
                searchFilterSchema={searchFilters}
                // onFilterChange={(filters, sortBy) => {
                //   console.log("Filters changed:", filters);
                //   console.log("Sort by:", sortBy);
                // }}
              />
            </aside>
            <div className="w-full">
              <div className="flex justify-between">
                <div>
                  <h1 className="text-2xl font-bold mb-0">Result</h1>
                  <p className="text-muted-foreground mt-0">
                    Try selecting some filters and applying them to see updated
                    results
                  </p>
                </div>
                <Sort options={sortBy} />
              </div>

              <SearchResult items={searchResults} />
            </div>
          </div>
        </main>
      </Suspense>
    </SearchProvider>
  );
};

export default Page;
