import { TaskSchema } from "../types";
import { useSearchFilter } from "@/app/contexts/useSearchFilter";
import { useComboboxValues } from "@/app/contexts/useComboboxValues";

export default function useFilterTasks(tasks: TaskSchema[]) {
  const { debouncedSearch: search } = useSearchFilter();
  const { statusValue, priorityValue } = useComboboxValues();

  const filteredTasks = tasks.filter((task) => {
    const titleFilter = task.title.toLowerCase().includes(search.toLowerCase());
    const statusFilter = statusValue ? task.status === statusValue : true;
    const priorityFilter = priorityValue ? task.priority === priorityValue : true;

    return titleFilter && statusFilter && priorityFilter;
  });

  return filteredTasks;
}
