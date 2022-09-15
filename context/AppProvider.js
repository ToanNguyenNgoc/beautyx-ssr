/* eslint-disable react-hooks/exhaustive-deps */
import React, { createContext } from "react";



export const AppContext = createContext();
export default function AppProvider({ children }) {
  const value = {

  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
