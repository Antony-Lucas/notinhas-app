import { useNoteContext } from "@/context/notes/noteActionsContext"
import useNotes from "@/hooks/notes/useNotes";


export default function UpdateNotes({id}:{id:number}){
    const {toggleMenu} = useNoteContext();
    const {
        getNoteById,
        updateNote,
        noteList,
        setTitle,
        title,
        setDescription,
        description,
        setStatus,
        status,
        setValue,
        value,
        setDate,
        date,
        setInputValue,
        inputValue,
        setShowPicker,
        showPicker,
        noteUpdate,
        clearFields,
        handleConfirm,
        hideDatePicker,
        formatValueForDatabase,} = useNotes();
    return(
        
    )
}