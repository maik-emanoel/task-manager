import StatusCombobox from "./status-combobox";
import PriorityCombobox from "./priority-combobox";
import SearchInput from "./search-input";
import { getTasks } from "@/app/utils/get-tasks";

export default async function FilterTools() {
  const tasks = await getTasks()

  return (
    <div className="flex gap-2 w-full">
      <SearchInput />

      <StatusCombobox tasks={tasks} />
      <PriorityCombobox tasks={tasks} />
    </div>
  );
}
