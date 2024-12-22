import { View } from "react-native";

import Account from "@/components/account/account";
import useCurrentSession from "@/hooks/auth/currentSession";

export default function TabTwoScreen() {
  const session = useCurrentSession();
  return (
    <View className="flex flex-col justify-center items-center h-screen px-10 ">
      <Account key={session?.user.id} session={session!} />
    </View>
  );
}
