/*import {
  GoogleSignin,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import { useEffect } from "react";
import { Button } from "@/components/Button";
import { Text } from "@/components/Text";
import { View } from "react-native";

GoogleSignin.configure({
  webClientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID,
  iosClientId: process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID,
});

export function LoginWithGoogle() {
  const configureGoogleSignin = async () => {
    try {
      // Verificar se os serviços do Google Play estão disponíveis
      await GoogleSignin.hasPlayServices();
      // Iniciar o One Tap Sign-In
      const userInfo = await GoogleSignin.signIn();
      console.log("Usuário autenticado: ", userInfo);
    } catch (error: any) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log("O usuário cancelou o login");
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log("O login já está em progresso");
      } else {
        console.log("Erro no login: ", error);
      }
    }
  };

  return (
    <Button
      onPress={() => {
        GoogleSignin.signIn();
      }}
    >
      <Text>Login com Google</Text>
    </Button>
  );
}*/
