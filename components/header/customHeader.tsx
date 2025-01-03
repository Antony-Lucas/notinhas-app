import { ThemedView } from "@/components/ThemedView";
import { Button, ButtonText } from "@/components/ui/button";
import { ArrowLeftIcon, EditIcon, Icon } from "@/components/ui/icon";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { router } from "expo-router";
import { Heading } from "../ui/heading";

export default function CustomHeader({
  id,
  name,
  isSecondRouter,
}: {
  id: string;
  name: string;
  isSecondRouter: boolean;
}) {
  return (
    <ThemedView className="w-full flex flex-row justify-between items-center">
      <Button
        variant="link"
        className="w-10"
        size="sm"
        onPress={() => {
          router.back();
        }}
      >
        <ButtonText>
          <Icon
            as={ArrowLeftIcon}
            className="text-typography-900 m-8 w-6 h-8"
          />
        </ButtonText>
      </Button>
      {isSecondRouter && (
        <Button
          variant="link"
          className="w-10"
          onPress={() => {
            router.push({
              pathname: "/(person)/update",
              params: { updateid: id, updateName: name },
            });
          }}
        >
          <ButtonText>
            <FontAwesome name="user-o" size={21} />
          </ButtonText>
        </Button>
      )}
    </ThemedView>
  );
}
