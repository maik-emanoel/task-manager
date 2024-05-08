import CreateTaskButton from "@/components/create-task-button";
import FilterTools from "@/components/filter-tools";
import Header from "@/components/header";
import Pagination from "@/components/pagination";
import Tasks from "@/components/tasks";

export default async function Home() {
  return (
    <div className="max-w-screen-lg mx-auto py-16 h-full w-[90%]">
      <Header />
      <div className="space-y-6 sm:space-y-4 mt-8">
        <div className="flex justify-between items-center flex-col gap-y-4 sm:flex-row">
          <FilterTools />
          <CreateTaskButton />
        </div>

        <Tasks />
        <Pagination />
      </div>
    </div>
  );
}
