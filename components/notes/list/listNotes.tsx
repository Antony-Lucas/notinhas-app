import { Button, ButtonText } from "@/components/ui/button";
import { ChevronRightIcon, Icon } from "@/components/ui/icon";
import useNotes from "@/context/notes/useNotes";
import { FlashList } from "@shopify/flash-list";
import { router } from "expo-router";
import { ScrollView } from "react-native";

export default function ListNotes({ id }: { id: number }) {
  const { noteList } = useNotes({ personId: id });
  return (
    <ScrollView className="w-full p-6 pb-10 pt-0">
      <FlashList
        inverted
        data={noteList}
        renderItem={({ item }) => (
          <Button
            variant="link"
            size={"lg"}
            className="flex justify-between items-center h-14 mt-1"
            onPress={() => {
              router.push({ pathname: "/(notes)", params: { id: item.id } });
            }}
          >
            <ButtonText className="color-primary-950">{item.date}</ButtonText>
            <Icon
              as={ChevronRightIcon}
              className="text-typography-500 my-2 w-4 h-4"
            />
          </Button>
        )}
        estimatedItemSize={100}
        keyExtractor={(item) => item.id.toString()}
      />
    </ScrollView>
  );
}
