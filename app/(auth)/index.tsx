import { HelloWave } from "@/components/HelloWave";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Button } from "@/components/Button";
import { Text } from "@/components/Text";
import { router } from "expo-router";
import { LoginWithGoogle } from "@/components/auth/GoogleAuthButton";

export default function AuthScreen() {
  return (
    <ThemedView className="flex items-center justify-center h-full w-full">
      <ThemedText type="title">Entrar</ThemedText>
      <Button
        variant={"secondary"}
        onPress={() => {
          router.push("/(tabs)");
        }}
      >
        <Text>Default</Text>
      </Button>
      <LoginWithGoogle />
    </ThemedView>
  );
}
