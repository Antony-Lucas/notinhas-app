import { View } from "react-native";

import CreatePerson from "@/components/person/create/createPerson";
import ListPerson from "@/components/person/list/listPerson";

export default function HomeScreen() {
  return (
    <View className="h-screen bg-white">
      <ListPerson />
      <CreatePerson />
    </View>
  );
}
