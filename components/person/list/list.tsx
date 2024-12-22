import { Button } from "@/components/Button";
import { Text } from "@/components/Text";
import usePerson from "@/hooks/person/person";
import { FlashList } from "@shopify/flash-list";
import { View } from "react-native";
export default function ListPerson() {
  const { personList } = usePerson();
  return (
    <View className="w-full h-screen p-10 py-20">
      <FlashList
        data={personList}
        renderItem={({ item }) => (
          <Button
            variant={"outline"}
            size={"lg"}
            className="flex items-start"
            onPress={() => console.log(item.id)}
          >
            <Text>{item.name}</Text>
          </Button>
        )}
        estimatedItemSize={200}
      />
    </View>
  );
}
