import CustomHeader from "@/components/header/customHeader";
import DeleteNotes from "@/components/notes/delete/deleteNotes";
import UpdateNotes from "@/components/notes/update/updateNotes";
import AddButtonReceivement from "@/components/receivements/create/addButtonReceivement";
import CreateReceivements from "@/components/receivements/create/createReceivement";
import ListReceivements from "@/components/receivements/list/listReceivements";
import { ThemedView } from "@/components/ThemedView";
import { NoteProvider } from "@/context/notes/noteActionsContext";
import { ReceivementProvider } from "@/context/receivement/receivementContext";
import { useLocalSearchParams } from "expo-router";
import { ScrollView } from "react-native";

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
        <DeleteNotes id={Number(noteId)} />
        <ReceivementProvider>
          <CreateReceivements id={Number(noteId)} />
          <ScrollView>
            <UpdateNotes id={Number(noteId)} />
            <ListReceivements id={Number(noteId)} />
          </ScrollView>
          <AddButtonReceivement />
        </ReceivementProvider>
      </ThemedView>
    </NoteProvider>
  );
}
