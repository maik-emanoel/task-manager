import { Input } from "./ui/input";
import  StatusCombobox  from "./status-combobox";
import PriorityCombobox from "./priority-combobox";

export default function FilterTools() {
  return (
    <div className="flex gap-2">
      <Input placeholder="Filter tasks..." name="filter-task-input" />
      <StatusCombobox />
      <PriorityCombobox />
    </div>
  );
}
