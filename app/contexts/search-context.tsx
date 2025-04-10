"use client";

import { addDays } from "date-fns";
import React, { createContext, useContext, useState, ReactNode } from "react";
import { DateRange } from "react-day-picker";

type SearchState = {
  location: {
    address: string;
    center: {
      lat: number;
      lng: number;
    } | null;
  };
  period: DateRange | null;
};

type SearchContextType = {
  search: SearchState;
  setSearch: (state: Partial<SearchState>) => void;
  reset: () => void;
};

const defaultState: SearchState = {
  location: {
    address: "Kuala Lumpur",
    center: {
      lat: 3.152815,
      lng: 101.703651,
    },
  },
  period: {
    from: new Date(),
    to: addDays(new Date(), 2),
  },
};

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const SearchProvider = ({ children }: { children: ReactNode }) => {
  const [search, setSearchState] = useState<SearchState>(defaultState);

  const setSearch = (update: Partial<SearchState>) => {
    setSearchState((prev) => ({ ...prev, ...update }));
  };

  const reset = () => setSearchState(defaultState);

  return (
    <SearchContext.Provider value={{ search, setSearch, reset }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) throw new Error("useSearch must be used within SearchProvider");
  return context;
};
