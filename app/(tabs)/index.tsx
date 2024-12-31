import { ScrollView, View } from "react-native";

import CreatePerson from "@/components/person/create/createPerson";
import ListPerson from "@/components/person/list/listPerson";
import { Heading } from "@/components/ui/heading";
import { ThemedView } from "@/components/ThemedView";

export default function HomeScreen() {
  return (
    <View className="h-screen bg-white">
      <ThemedView className="pt-14 px-6 pb-6">
        <Heading>Pessoas</Heading>
      </ThemedView>
      <ScrollView>
        <ListPerson />
      </ScrollView>
      <CreatePerson />
    </View>
  );
}
