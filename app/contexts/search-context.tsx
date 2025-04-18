/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { createContext, useContext } from "react";
import { DateRange } from "react-day-picker";
import { FilterType, FilterValue } from "../types/filters";

type LocationType = {
  address: string;
  center: {
    lat: number;
    lng: number;
  };
};

interface SearchContextValue {
  query: string;
  setQuery: (value: string) => void;
  location: LocationType;
  setLocation: (location: LocationType) => void;
  period: DateRange | null;
  setPeriod: (period: DateRange | null) => void;
  filters: Record<string, FilterValue[]>;
  setFilter: (
    key: string,
    value: FilterValue,
    filterType?: FilterType["type"]
  ) => void;
  removeFilter: (key: string, value: any) => void;
  clearFilter: () => void;
  sort: string;
  setSort: (value: string) => void;
  triggerSearch: () => void;
  reset: () => void;
}

export const SearchContext = createContext<SearchContextValue | undefined>(
  undefined
);

export const useSearchContext = () => {
  const context = useContext(SearchContext);
  if (!context) throw new Error("useSearch must be used within SearchProvider");
  return context;
};
