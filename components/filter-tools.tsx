"use client";

import { Input } from "./ui/input";
import StatusCombobox from "./status-combobox";
import PriorityCombobox from "./priority-combobox";
import { useSearchFilter } from "@/app/contexts/useSearchFilter";

export default function FilterTools() {
  const { handleSearchFilter } = useSearchFilter();

  return (
    <div className="flex gap-2">
      <Input
        placeholder="Filter tasks..."
        name="filter-input"
        onChange={(e) => handleSearchFilter(e.target.value)}
      />
      <StatusCombobox />
      <PriorityCombobox />
    </div>
  );
}
