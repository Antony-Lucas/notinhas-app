import { ThemedView } from "@/components/ThemedView";
import { router } from "expo-router";
import { View } from "react-native";
import { useEffect } from "react";
import EmailAndPasswordAuth from "@/components/auth/EmailAuth";
import useCurrentSession from "@/hooks/auth/currentSession";

export default function AuthScreen() {
  const session = useCurrentSession();

  useEffect(() => {
    if (session?.user) {
      router.push("/(tabs)");
    }
  }, [session]);

  return (
    <ThemedView className="flex items-center justify-center h-full w-full">
      <View className="w-4/5">
        {session && session.user ? null : <EmailAndPasswordAuth />}
      </View>
    </ThemedView>
  );
}
