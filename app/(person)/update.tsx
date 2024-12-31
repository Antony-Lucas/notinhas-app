import CustomHeader from "@/components/header/customHeader";
import DeletePerson from "@/components/person/delete/deletePerson";
import UpdatePerson from "@/components/person/update/updatePerson";
import { ThemedView } from "@/components/ThemedView";
import { Text } from "@/components/ui/text";
import { UpdatePersonMenuProvider } from "@/context/person/updatePersonContext";
import usePerson from "@/hooks/person/person";
import { useLocalSearchParams } from "expo-router";

export default function UpdatePersonScreen() {
  const { updateid } = useLocalSearchParams();
  const { name } = usePerson();
  return (
    <UpdatePersonMenuProvider>
      <ThemedView className="h-full flex py-12 px-4 bg-white">
        <CustomHeader
          id={String(updateid)}
          name={name}
          isSecondRouter={false}
        />
        <UpdatePerson id={String(updateid)} />
        <DeletePerson id={String(updateid)} />
      </ThemedView>
    </UpdatePersonMenuProvider>
  );
}
