import { MenuContextType } from "@/scripts/interfaces/person/updatePersonInterface";
import React, { createContext, useContext, useState } from "react";

const UpdatePersonMenuContext = createContext<MenuContextType | undefined>(
  undefined
);

export const UpdatePersonMenuProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [openUpdateAS, setOpenUpdateAS] = useState(false);

  const toggleMenu = () => setOpenUpdateAS((prev) => !prev);

  return (
    <UpdatePersonMenuContext.Provider value={{ openUpdateAS, toggleMenu }}>
      {children}
    </UpdatePersonMenuContext.Provider>
  );
};

export const useMenu = (): MenuContextType => {
  const context = useContext(UpdatePersonMenuContext);
  if (!context) {
    throw new Error("useMenu must be used within a UpdatePersonMenuProvider");
  }
  return context;
};
