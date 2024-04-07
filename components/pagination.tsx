"use client";

import {
  CaretDoubleLeft,
  CaretDoubleRight,
  CaretLeft,
  CaretRight,
} from "@phosphor-icons/react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Button } from "./ui/button";
import { usePagination } from "@/app/contexts/usePagination";

export default function Pagination() {
  const {
    page,
    goToInitialPage,
    goToNextPage,
    goToLastPage,
    goToPreviousPage,
    totalPages,
    updateRowsPerPage,
    rowsPerPage,
  } = usePagination();

  return (
    <div className="py-2 px-2 flex w-full justify-between text-muted-foreground">
      <p className="text-sm">
        Page {page} of {totalPages}
      </p>

      <div className="flex items-center gap-14">
        <div className="flex items-center gap-2">
          <span className="whitespace-nowrap text-sm">Rows per page</span>

          <Select
            defaultValue="10"
            onValueChange={(value) => updateRowsPerPage(value)}
          >
            <SelectTrigger
              aria-label="Page"
              className="w-14 h-8 px-2.5"
            >
              <SelectValue>{rowsPerPage}</SelectValue>
            </SelectTrigger>
            <SelectContent align="end">
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="20">20</SelectItem>
              <SelectItem value="50">50</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-x-1">
          <Button
            variant="outline"
            className="size-8 p-0"
            onClick={goToInitialPage}
            disabled={page === 1}
          >
            <CaretDoubleLeft size={14} />
          </Button>
          <Button
            variant="outline"
            className="size-8 p-0"
            onClick={goToPreviousPage}
            disabled={page === 1}
          >
            <CaretLeft size={14} />
          </Button>
          <Button
            variant="outline"
            className="size-8 p-0"
            onClick={goToNextPage}
            disabled={page === totalPages}
          >
            <CaretRight size={14} />
          </Button>
          <Button
            variant="outline"
            className="size-8 p-0"
            onClick={() => goToLastPage(totalPages)}
            disabled={page === totalPages}
          >
            <CaretDoubleRight size={14} />
          </Button>
        </div>
      </div>
    </div>
  );
}
