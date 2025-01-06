import { Button, ButtonText } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { ChevronRightIcon, Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import useReceivement from "@/hooks/receivements/useReceivements";
import { FlashList } from "@shopify/flash-list";
import { router } from "expo-router";
import { ScrollView } from "react-native";

export default function ListReceivements({ id }: { id: number }) {
  const { receivementList } = useReceivement({ noteId: id });
  return (
    <ScrollView className="w-full p-3 pb-10 pt-10">
      <Heading size="md">Baixas da nota</Heading>
      <FlashList
        inverted
        data={receivementList}
        renderItem={({ item }) => (
          <Button
            variant="link"
            size={"lg"}
            className="flex justify-between items-center h-14 mt-1"
            onPress={() => {
              router.push({
                pathname: "/(notes)",
                params: { noteId: item.id, noteTitle: item.title },
              });
            }}
          >
            <ButtonText className="color-primary-950">{item.title}</ButtonText>
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
