"use client";

import { MagnifyingGlass } from "@phosphor-icons/react";
import { Input } from "./ui/input";
import { useSearchFilter } from "@/app/contexts/useSearchFilter";

export default function SearchInput() {
  const { handleSearchFilter } = useSearchFilter();

  return (
    <div className="relative w-full sm:w-fit">
      <Input
        placeholder="Filter tasks..."
        name="search-input"
        onChange={(e) => handleSearchFilter(e.target.value)}
        className="pl-10 peer"
      />
      <MagnifyingGlass
        size={16}
        className="absolute top-1/2 -translate-y-1/2 left-3 text-muted-foreground peer-focus:text-primary"
      />
    </div>
  );
}
