import { Button } from "@/components/Button";
import { Text } from "@/components/Text";
import usePerson from "@/hooks/person/person";
import { FlashList } from "@shopify/flash-list";
import { View } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";

export default function ListPerson() {
  const { personList, getPersonById } = usePerson();
  const router = useRouter();
  return (
    <View className="w-full h-screen p-10 py-20">
      <FlashList
        data={personList}
        renderItem={({ item }) => (
          <Button
            variant={"outline"}
            size={"lg"}
            className="flex items-start"
            onPress={() => {
              router.push({ pathname: "/(person)", params: { id: item.id } });
              getPersonById({ id: item.id });
            }}
          >
            <Text>{item.name}</Text>
          </Button>
        )}
        estimatedItemSize={200}
      />
    </View>
  );
}
