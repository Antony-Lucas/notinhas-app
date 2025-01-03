import { MenuContextType } from "@/scripts/interfaces/person/updatePersonInterface";
import React, { createContext, useContext, useState } from "react";

const noteActionContext = createContext<MenuContextType | undefined>(undefined);

export const NoteProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [openNoteAction, setOpenNoteAction] = useState(false);

  const toggleMenu = () => setOpenNoteAction((prev) => !prev);

  return (
    <noteActionContext.Provider value={{ openNoteAction, toggleMenu }}>
      {children}
    </noteActionContext.Provider>
  );
};

export const useNoteContext = (): MenuContextType => {
  const context = useContext(noteActionContext);
  if (!context) {
    throw new Error("useMenu must be used within a UpdatePersonMenuProvider");
  }
  return context;
};
