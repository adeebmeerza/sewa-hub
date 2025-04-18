"use client";

import { useCallback, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useFilter } from "./use-filter";
import { addDays } from "date-fns";
import { DateRange } from "react-day-picker";

export const useSearch = () => {
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState({
    address: "Kuala Lumpur",
    center: {
      lat: 3.152815,
      lng: 101.703651,
    },
  });
  const [period, setPeriod] = useState<DateRange | null>({
    from: new Date(),
    to: addDays(new Date(), 2),
  });
  const [sort, setSort] = useState("newest");
  const { filters, setFilter, removeFilter, clearFilter } = useFilter();

  const router = useRouter();
  const pathname = usePathname();

  // Create a query string from the current filters and sort
  const createQueryString = useCallback(() => {
    const params = new URLSearchParams();

    params.set("query", query);

    Object.entries(filters).forEach(([key, values]) => {
      values.forEach((value) => {
        params.append(key, String(value));
      });
    });

    if (sort) {
      params.set("sort", sort);
    }
    return params.toString();
  }, [filters, query, sort]);

  const triggerSearch = useCallback(() => {
    const queryString = createQueryString();
    router.push(`${pathname}${queryString ? `?${queryString}` : ""}`);

    console.log("Searching with:", queryString);
  }, [createQueryString, pathname, router]);

  const reset = useCallback(() => {
    setQuery("");
    setSort("relevance");
    clearFilter();
  }, [clearFilter]);

  return {
    query,
    setQuery,
    location,
    setLocation,
    period,
    setPeriod,
    filters,
    setFilter,
    removeFilter,
    clearFilter,
    sort,
    setSort,
    triggerSearch,
    reset,
  };
};
