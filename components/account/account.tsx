import { supabaseUtil } from "@/utils/supabaseUtil";
import { Session } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { Alert, View } from "react-native";
import { Input } from "@/components/Input";
import { Text } from "@/components/Text";
import { Button } from "@/components/Button";
import { router } from "expo-router";

export default function Account({ session }: { session: Session }) {
  const [loading, setLoading] = useState(true);
  const [name, setUsername] = useState("");

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
        setUsername(data.name);
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
    <View className="w-11/12">
      <Text>Tanka kkkk</Text>
      <View>
        <Input
          placeholder={`${session?.user?.email}`}
          value={session?.user?.email}
          editable={false}
        />
      </View>
      <View>
        <Input
          placeholder={`${name}`}
          value={name || ""}
          onChangeText={(text) => setUsername(text)}
        />
      </View>
      <View>
        <Button onPress={() => updateProfile({ name })} disabled={loading}>
          <Text>{loading ? "Loading ..." : "Update"}</Text>
        </Button>
      </View>

      <View>
        <Button
          onPress={() => {
            supabaseUtil.auth.signOut();
            router.navigate("/(auth)");
          }}
        >
          <Text>Sair</Text>
        </Button>
      </View>
    </View>
  );
}
