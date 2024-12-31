import CustomHeader from "@/components/header/customHeader";
import { ThemedView } from "@/components/ThemedView";
import { UpdatePersonMenuProvider } from "@/context/person/updatePersonContext";
import usePerson from "@/hooks/person/person";
import { useLocalSearchParams } from "expo-router";

export default function PersonScreen() {
  const { id } = useLocalSearchParams();
  const { name } = usePerson();

  return (
    <UpdatePersonMenuProvider>
      <ThemedView className="h-full flex py-12 pt-[2.9rem] px-4 bg-white">
        <CustomHeader name={name} id={String(id)} isSecondRouter={true} />
      </ThemedView>
    </UpdatePersonMenuProvider>
  );
}
