import React from "react";
import { Button } from "react-native";
import switchTheme from "react-native-theme-switch-animation";

export default function SwitchThemeColor() {
  const [theme, setTheme] = React.useState("light");

  return (
    <Button
      title="Switch Theme"
      onPress={() => {
        switchTheme({
          switchThemeFunction: () => {
            setTheme(theme === "light" ? "dark" : "light");
          },
          animationConfig: {
            type: "fade",
            duration: 900,
          },
        });
      }}
    />
  );
}
