import CustomHeader from "@/components/header/customHeader";
import CreateNotes from "@/components/notes/create/createNotes";
import ListNotes from "@/components/notes/list/listNotes";
import { ThemedView } from "@/components/ThemedView";
import { Heading } from "@/components/ui/heading";
import { UpdatePersonMenuProvider } from "@/context/person/updatePersonContext";
import usePerson from "@/hooks/person/person";
import { useLocalSearchParams } from "expo-router";
import { ScrollView } from "react-native";

export default function PersonScreen() {
  const { id, name } = useLocalSearchParams();

  return (
    <UpdatePersonMenuProvider>
      <ThemedView className="h-full flex justify-between py-12 pt-[2.9rem] px-4 bg-white">
        <CustomHeader
          name={String(name)}
          id={String(id)}
          isSecondRouter={true}
        />
        <Heading className="py-6 px-3">Notas de {name}</Heading>
        <ScrollView>
          <ListNotes id={Number(id)} />
        </ScrollView>
        <CreateNotes id={Number(id)} />
      </ThemedView>
    </UpdatePersonMenuProvider>
  );
}
