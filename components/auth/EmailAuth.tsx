import { supabaseUtil } from "@/utils/supabaseUtil";
import React, { useState } from "react";
import { Alert, StyleSheet, View, AppState } from "react-native";
import { Input } from "@/components/Input";
import { Text } from "@/components/Text";
import { Button } from "../Button";

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
    <View>
      <View>
        <Input
          onChangeText={(text) => setEmail(text)}
          value={email}
          placeholder="email@address.com"
          autoCapitalize={"none"}
        />
        <Input
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry={true}
          placeholder="Senha"
          autoCapitalize={"none"}
        />
      </View>
      <View>
        <Button disabled={loading} onPress={() => signInWithEmail()}>
          <Text>Entrar</Text>
        </Button>
      </View>
      <View>
        <Button disabled={loading} onPress={() => signUpWithEmail()}>
          <Text>Cadastrar-se</Text>
        </Button>
      </View>
    </View>
  );
}
