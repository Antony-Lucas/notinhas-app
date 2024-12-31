import usePerson from "@/hooks/person/person";
import { FlashList } from "@shopify/flash-list";
import { ScrollView, View } from "react-native";
import { useRouter } from "expo-router";
import { Button, ButtonText } from "@/components/ui/button";
import { ChevronRightIcon, Icon } from "@/components/ui/icon";

export default function ListPerson() {
  const { personList } = usePerson();
  const router = useRouter();
  return (
    <ScrollView className="w-full p-6 pb-10 pt-0">
      <FlashList
        inverted
        data={personList}
        renderItem={({ item }) => (
          <Button
            variant="link"
            size={"lg"}
            className="flex justify-between items-center px-4 h-14 mt-1"
            onPress={() => {
              router.push({ pathname: "/(person)", params: { id: item.id } });
            }}
          >
            <ButtonText className="color-primary-950">{item.name}</ButtonText>
            <Icon
              as={ChevronRightIcon}
              className="text-typography-500 my-2 w-4 h-4"
            />
          </Button>
        )}
        estimatedItemSize={200}
        keyExtractor={(item) => item.id.toString()}
      />
    </ScrollView>
  );
}
