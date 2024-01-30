"use client";

import { explorerData } from "@/data/explorerData";
import { IDataContext } from "@/helper/interface";
import { reducers } from "@/reducers/stateReducer";
import React, { createContext, useContext, useReducer } from "react";

const DataContext = createContext<IDataContext>({ state: explorerData });
export const useDataContext = () => useContext(DataContext);

export const DataContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(reducers, explorerData);

  return (
    <DataContext.Provider value={{ state, dispatch }}>
      {children}
    </DataContext.Provider>
  );
};
