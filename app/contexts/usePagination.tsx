"use client";

import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

interface PaginationContextSchema {
  page: number;
  goToNextPage: () => void;
  goToPreviousPage: () => void;
  goToInitialPage: () => void;
  goToLastPage: (totalPages: number) => void;
  totalPages: number;
  setTotalPages: Dispatch<SetStateAction<number>>;
  updateRowsPerPage: (value: string) => void;
  rowsPerPage: number;
}

export const PaginationContext = createContext<undefined | PaginationContextSchema>(undefined);

export function PaginationProvider({ children }: { children: ReactNode }) {
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  function goToNextPage() {
    setPage(page + 1);
  }

  function goToPreviousPage() {
    setPage(page - 1);
  }

  function goToInitialPage() {
    setPage(1);
  }

  function goToLastPage(totalPages: number) {
    setPage(totalPages);
  }

  function updateRowsPerPage(value: string) {
    setRowsPerPage(Number(value));
  }

  return (
    <PaginationContext.Provider
      value={{
        page,
        goToNextPage,
        goToPreviousPage,
        goToInitialPage,
        goToLastPage,
        totalPages,
        setTotalPages,
        updateRowsPerPage,
        rowsPerPage
      }}
    >
      {children}
    </PaginationContext.Provider>
  );
}

export function usePagination() {
  const context = useContext(PaginationContext);
  if (context === undefined) {
    throw new Error(
      "usePagination deve ser usado dentro de um PaginationProvider"
    );
  }

  return context;
}
