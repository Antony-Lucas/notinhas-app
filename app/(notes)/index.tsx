import CustomHeader from "@/components/header/customHeader";
import { ThemedView } from "@/components/ThemedView";
import { Text } from "@/components/ui/text";
import { useLocalSearchParams } from "expo-router";

export default function NoteScreen() {
  const { noteId, noteTitle } = useLocalSearchParams();
  return (
    <ThemedView className="h-full flex justify-between py-12 pt-[2.9rem] px-4 bg-white">
      <CustomHeader
        name={String(noteTitle)}
        id={String(noteId)}
        isSecondRouter={false}
      />
    </ThemedView>
  );
}
