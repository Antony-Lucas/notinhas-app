import { View } from "react-native";

import PersonModal from "@/components/modals/personModal";
import ListPerson from "@/components/person/list/list";

export default function HomeScreen() {
  return (
    <View className="h-screen bg-white">
      <ListPerson />
      <PersonModal />
    </View>
  );
}
