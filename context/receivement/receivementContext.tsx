import { ReceivementContextInterface } from "@/scripts/interfaces/receivements/receivementsInterface";
import React, { createContext, useContext, useState } from "react";

const receivementContext = createContext<
  ReceivementContextInterface | undefined
>(undefined);

export const ReceivementProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [openReceivementAction, setOpenReceivementAction] = useState(false);

  const toggleMenuReceivements = () => {
    setOpenReceivementAction((prev) => !prev);
  };

  return (
    <receivementContext.Provider
      value={{ openReceivementAction, toggleMenuReceivements }}
    >
      {children}
    </receivementContext.Provider>
  );
};

export const useReceivementContext = (): ReceivementContextInterface => {
  const context = useContext(receivementContext);
  if (!context) {
    throw new Error("useMenu must be used within a NoteProvider");
  }
  return context;
};
