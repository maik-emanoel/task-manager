"use client";

import { Input } from "./ui/input";
import StatusCombobox from "./status-combobox";
import PriorityCombobox from "./priority-combobox";
import { useSearchFilter } from "@/app/contexts/useSearchFilter";
import { MagnifyingGlass } from "@phosphor-icons/react";

export default function FilterTools() {
  const { handleSearchFilter } = useSearchFilter();

  return (
    <div className="flex gap-2">
      <div className="relative">
        <Input
          placeholder="Filter tasks..."
          name="filter-input"
          onChange={(e) => handleSearchFilter(e.target.value)}
          className="pl-10 peer"
        />
        <MagnifyingGlass size={16} className="absolute top-1/2 -translate-y-1/2 left-3 text-muted-foreground peer-focus:text-primary" />
      </div>

      <StatusCombobox />
      <PriorityCombobox />
    </div>
  );
}
