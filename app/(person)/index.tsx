import { Text } from "@/components/Text";
import usePerson from "@/hooks/person/person";
import { useLocalSearchParams } from "expo-router";
import { View } from "react-native";

export default function PersonScreen() {
  const { personDataUpdate } = usePerson();
  const item = useLocalSearchParams();
  return (
    <View className="h-screen flex items-center justify-center">
      <Text>duran {personDataUpdate}</Text>
    </View>
  );
}
