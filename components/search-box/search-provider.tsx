"use client";

import { SearchContext } from "@/app/contexts/search-context";
import { useSearch } from "@/app/hooks/use-search";
import { ReactNode } from "react";

function SearchProvider({ children }: { children: ReactNode }) {
  const search = useSearch();

  return (
    <SearchContext.Provider value={search}>{children}</SearchContext.Provider>
  );
}

export default SearchProvider;
