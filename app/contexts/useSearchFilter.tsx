"use client";

import { ReactNode, createContext, useContext, useState } from "react";
import useDebounceValue from "../hooks/useDebounceValue";
import { usePagination } from "./usePagination";

interface SearchFilterContextSchema {
  debouncedSearch: string;
  handleSearchFilter: (value: string) => void;
}

export const SearchFilterContext = createContext<
  SearchFilterContextSchema | undefined
>(undefined);

export function SearchFilterProvider({ children }: { children: ReactNode }) {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounceValue(search, 250);
  const { goToInitialPage } = usePagination();

  function handleSearchFilter(value: string) {
    setSearch(value);
    goToInitialPage();
  }

  return (
    <SearchFilterContext.Provider
      value={{ debouncedSearch, handleSearchFilter }}
    >
      {children}
    </SearchFilterContext.Provider>
  );
}

export function useSearchFilter() {
  const context = useContext(SearchFilterContext);

  if (context === undefined) {
    throw new Error("UseSearchFilter must be inside of a SearchFilterProvider");
  }

  return context;
}
