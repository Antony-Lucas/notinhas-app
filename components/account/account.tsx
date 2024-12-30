import { supabaseUtil } from "@/utils/supabaseUtil";
import { Session } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { Alert, View } from "react-native";
import { router } from "expo-router";
import { ThemedView } from "../ThemedView";
import { Text } from "../ui/text";
import {
  FormControl,
  FormControlLabel,
  FormControlLabelText,
} from "../ui/form-control";
import { Input, InputField } from "../ui/input";
import { Button, ButtonText } from "../ui/button";

export default function Account({ session }: { session: Session }) {
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");

  useEffect(() => {
    if (session) getProfile();
  }, [session]);

  async function getProfile() {
    try {
      setLoading(true);
      if (!session?.user) throw new Error("No user on the session!");

      const { data, error, status } = await supabaseUtil
        .from("user_id")
        .select(`name`)
        .eq("id", session?.user.id)
        .single();
      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setName(data.name);
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    } finally {
      setLoading(false);
    }
  }

  async function updateProfile({ name }: { name: string }) {
    try {
      setLoading(true);
      if (!session?.user) throw new Error("No user on the session!");

      const updates = {
        id: session?.user.id,
        name,
        updated_at: new Date(),
      };

      const { error } = await supabaseUtil.from("user_id").upsert(updates);

      if (error) {
        throw error;
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <ThemedView className="w-11/12">
      <Text size="lg">Minha Conta</Text>
      <FormControl size="lg">
        <FormControlLabel>
          <FormControlLabelText>Email</FormControlLabelText>
        </FormControlLabel>
        <Input size={"lg"}>
          <InputField
            type="text"
            className="py-0"
            placeholder={`${session?.user?.email}`}
            autoCapitalize="none"
            value={session?.user?.email}
            editable={false}
          />
        </Input>
      </FormControl>
      <FormControl size="md">
        <FormControlLabel>
          <FormControlLabelText>Nome completo</FormControlLabelText>
        </FormControlLabel>
        <Input size={"lg"}>
          <InputField
            type="text"
            className="py-0"
            autoCapitalize="none"
            value={name}
            onChangeText={(text) => setName(text)}
          />
        </Input>
      </FormControl>
      <Button
        disabled={loading}
        className="mt-4"
        size="lg"
        onPress={() => updateProfile({ name })}
        isDisabled={loading}
      >
        <ButtonText>{loading ? "Loading ..." : "Atualizar"}</ButtonText>
      </Button>
      <Button
        disabled={loading}
        variant="outline"
        className=" mt-4"
        size="lg"
        onPress={() => {
          supabaseUtil.auth.signOut();
          router.navigate("/(auth)");
        }}
      >
        <ButtonText>Sair</ButtonText>
      </Button>
    </ThemedView>
  );
}
