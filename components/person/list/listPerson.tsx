import usePerson from "@/hooks/person/person";
import { FlashList } from "@shopify/flash-list";
import { View } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { Button, ButtonText } from "@/components/ui/button";
import { ChevronRightIcon, Icon } from "@/components/ui/icon";

export default function ListPerson() {
  const { personList, getPersonById } = usePerson();
  const router = useRouter();
  return (
    <View className="w-full h-screen p-10 py-20">
      <FlashList
        data={personList}
        renderItem={({ item }) => (
          <Button
            variant={"link"}
            size={"lg"}
            className="flex justify-between items-center"
            onPress={() => {
              router.push({ pathname: "/(person)", params: { id: item.id } });
              getPersonById({ id: item.id });
            }}
          >
            <ButtonText>{item.name}</ButtonText>
            <Icon
              as={ChevronRightIcon}
              className="text-typography-500 m-2 w-4 h-4"
            />
          </Button>
        )}
        estimatedItemSize={200}
      />
    </View>
  );
}
