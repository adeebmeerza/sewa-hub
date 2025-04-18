"use client";

import { useCallback, useState } from "react";
import { FilterType, FilterValue } from "../types/filters";

export function useFilter() {
  const [filters, setFilters] = useState<Record<string, FilterValue[]>>({});

  const setFilter = useCallback(
    (key: string, value: FilterValue, filterType?: FilterType["type"]) => {
      setFilters((prev) => {
        switch (filterType) {
          case "singleSelect":
          case "distance":
          case "rangeSlider":
            return {
              ...prev,
              [key]: [value],
            };

          case "multiSelect":
          case "starRating":
          default:
            const existing = prev[key] || [];
            if (existing?.includes(value)) return prev;

            return {
              ...prev,
              [key]: [...existing, value],
            };
        }
      });
    },
    []
  );

  const removeFilter = useCallback((key: string, value: FilterValue) => {
    setFilters((prev) => ({
      ...prev,
      [key]: prev[key]?.filter((v) => v !== value) || [],
    }));
  }, []);

  const clearFilter = useCallback(() => {
    setFilters({});
  }, []);

  return {
    filters,
    setFilter,
    removeFilter,
    clearFilter,
  };
}
