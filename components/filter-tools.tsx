import StatusCombobox from "./status-combobox";
import PriorityCombobox from "./priority-combobox";
import SearchInput from "./search-input";
import { getTasks } from "@/app/utils/get-tasks";

export default async function FilterTools() {
  const tasks = await getTasks();

  return (
    <div className="flex flex-col gap-2 w-full sm:flex-row">
      <SearchInput />

      <div className="flex justify-between gap-2">
        <StatusCombobox tasks={tasks} />
        <PriorityCombobox tasks={tasks} />
      </div>
    </div>
  );
}
