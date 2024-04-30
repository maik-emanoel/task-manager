"use client";

import { ReactNode, createContext, useContext, useState } from "react";

interface ComboboxValuesSchema {
  statusValue: string;
  priorityValue: string;
  handleChangeStatusValue: (value: string) => void;
  handleChangePriorityValue: (value: string) => void;
}

export const ComboboxValuesContext = createContext<
  ComboboxValuesSchema | undefined
>(undefined);

export function ComboboxValuesProvider({ children }: { children: ReactNode }) {
  const [statusValue, setStatusValue] = useState("");
  const [priorityValue, setPriorityValue] = useState("");

  function handleChangeStatusValue(value: string) {
    setStatusValue(value);
  }

  function handleChangePriorityValue(value: string) {
    setPriorityValue(value);
  }

  return (
    <ComboboxValuesContext.Provider
      value={{
        statusValue,
        priorityValue,
        handleChangePriorityValue,
        handleChangeStatusValue,
      }}
    >
      {children}
    </ComboboxValuesContext.Provider>
  );
}

export function useComboboxValues() {
  const context = useContext(ComboboxValuesContext);

  if (context === undefined) {
    throw new Error(
      "useComboboxValues must be inside of a ComboboxValuesProvider"
    );
  }

  return context;
}
