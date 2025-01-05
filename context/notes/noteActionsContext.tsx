import { NoteContextType } from "@/scripts/interfaces/notes/noteInterface";
import React, { createContext, useContext, useState } from "react";

const noteActionContext = createContext<NoteContextType | undefined>(undefined);

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

export const useNoteContext = (): NoteContextType => {
  const context = useContext(noteActionContext);
  if (!context) {
    throw new Error("useMenu must be used within a UpdatePersonMenuProvider");
  }
  return context;
};
