import { useEffect, useRef } from "react";
import { FiltersObject } from "../types/filters";
import { useSearchParams } from "next/navigation";
import { useSearchContext } from "../contexts/search-context";

export function useInitializeFilters(searchFilterSchema: FiltersObject) {
  const searchParams = useSearchParams();
  const { filters: selectedFilter, setFilter } = useSearchContext();

  const isInitialized = useRef(false);

  useEffect(() => {
    if (isInitialized.current) return;

    // Initialize each filter category with values from URL
    Object.keys(searchFilterSchema).forEach((filterKey) => {
      const filter = searchFilterSchema[filterKey];

      if (filter.type === "rangeSlider") {
        const minParam =
          searchParams.get(`${filterKey}Min`) ||
          filter.defaultMin?.toString() ||
          filter.min.toString();
        const maxParam =
          searchParams.get(`${filterKey}Max`) ||
          filter.defaultMax?.toString() ||
          filter.max.toString();

        if (selectedFilter[`${filterKey}Min`]?.[0] !== minParam) {
          setFilter(`${filterKey}Min`, minParam);
        }
        if (selectedFilter[`${filterKey}Max`]?.[0] !== maxParam) {
          setFilter(`${filterKey}Max`, maxParam);
        }
      } else {
        const paramValues = searchParams.getAll(filterKey);
        paramValues.forEach((val) => setFilter(filterKey, val));
      }
    });

    isInitialized.current = true;
  }, [searchFilterSchema, searchParams, selectedFilter, setFilter]);
}
