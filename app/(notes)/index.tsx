import CustomHeader from "@/components/header/customHeader";
import DeleteNotes from "@/components/notes/delete/deleteNotes";
import UpdateNotes from "@/components/notes/update/updateNotes";
import { ThemedView } from "@/components/ThemedView";
import { Text } from "@/components/ui/text";
import { NoteProvider } from "@/context/notes/noteActionsContext";
import { useLocalSearchParams } from "expo-router";

export default function NoteScreen() {
  const { noteId, noteTitle } = useLocalSearchParams();
  return (
    <NoteProvider>
      <ThemedView className="h-full flex justify-between py-12 pt-[2.9rem] px-4 bg-white">
        <CustomHeader
          name={String(noteTitle)}
          id={String(noteId)}
          isSecondRouter={false}
        />
        <UpdateNotes id={Number(noteId)} />
        <DeleteNotes id={Number(noteId)} />
      </ThemedView>
    </NoteProvider>
  );
}
