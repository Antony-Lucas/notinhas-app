import { supabaseUtil } from "@/utils/supabaseUtil";
import React, { useState } from "react";
import { Alert, StyleSheet, View, AppState } from "react-native";
import { ThemedView } from "../ThemedView";
import {
  FormControl,
  FormControlLabel,
  FormControlLabelText,
} from "../ui/form-control";
import { Input, InputField } from "../ui/input";
import { Button, ButtonText } from "../ui/button";

AppState.addEventListener("change", (state) => {
  if (state === "active") {
    supabaseUtil.auth.startAutoRefresh();
  } else {
    supabaseUtil.auth.stopAutoRefresh();
  }
});

export default function EmailAndPasswordAuth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function signInWithEmail() {
    setLoading(true);

    const { error } = await supabaseUtil.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) Alert.alert(error.message);
    setLoading(false);
  }

  async function signUpWithEmail() {
    setLoading(true);

    const {
      data: { user, session },
      error,
    } = await supabaseUtil.auth.signUp({
      email: email,
      password: password,
    });

    try {
      const { error: insertError } = await supabaseUtil
        .from("user_id")
        .insert([{ id: user?.id, email: user?.email }]);

      if (insertError) {
        Alert.alert(
          "Erro ao criar registro na tabela user_id:",
          insertError.message
        );
      } else {
        Alert.alert("Usuário criado com sucesso!");
      }
    } catch (err) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    }

    if (error) Alert.alert(error.message);
    setLoading(false);
  }

  return (
    <ThemedView>
      <FormControl size="lg">
        <FormControlLabel>
          <FormControlLabelText>Email</FormControlLabelText>
        </FormControlLabel>
        <Input size={"lg"}>
          <InputField
            type="text"
            className="py-0"
            placeholder="email"
            autoCapitalize="none"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
        </Input>
      </FormControl>
      <FormControl size="md">
        <FormControlLabel>
          <FormControlLabelText>Password</FormControlLabelText>
        </FormControlLabel>
        <Input size={"lg"}>
          <InputField
            type="password"
            className="py-0"
            placeholder="password"
            autoCapitalize="none"
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
        </Input>
      </FormControl>
      <Button
        disabled={loading}
        className="mt-4"
        size="lg"
        onPress={() => {
          signInWithEmail();
        }}
      >
        <ButtonText>Entrar</ButtonText>
      </Button>
      <Button
        disabled={loading}
        className=" mt-4"
        size="lg"
        onPress={() => {
          signUpWithEmail();
        }}
      >
        <ButtonText>Criar conta</ButtonText>
      </Button>
    </ThemedView>
  );
}
