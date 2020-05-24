import React from "react";
import AppNavigator from "./src/navigation/AppNavigator";
import { Text, StyleSheet } from "react-native";
import { useFonts } from "@use-expo/font";
import { Block } from "./src/components/ui";
import { AppLoading } from "expo";
import * as firebase from "firebase";
import "firebase/database";
import { firebaseConfig } from "./secrets/firebaseConfig";
import { AuthProvider } from "./src/context/authContext";

export default function App() {
  React.useEffect(() => {
    firebase.initializeApp(firebaseConfig);
  }, []);

  const [isLoaded] = useFonts({
    "SourceSans-ExtraLight": require("./assets/fonts/SourceSansPro-ExtraLight.ttf"),
    "SourceSans-Light": require("./assets/fonts/SourceSansPro-Light.ttf"),
    "SourceSans-Regular": require("./assets/fonts/SourceSansPro-Regular.ttf"),
    "SourceSans-SemiBold": require("./assets/fonts/SourceSansPro-SemiBold.ttf"),
    "SourceSans-Bold": require("./assets/fonts/SourceSansPro-Bold.ttf"),
    "SourceSans-Black": require("./assets/fonts/SourceSansPro-Black.ttf"),
  });

  if (!isLoaded) {
    return <AppLoading />;
  } else {
    const styles = StyleSheet.create({
      defaultFontFamily: {
        fontFamily: "SourceSans-Regular",
      },
    });

    const oldRender = Text.render;
    Text.render = function render(...args) {
      const origin = oldRender.call(this, ...args);
      return React.cloneElement(origin, {
        style: [styles.defaultFontFamily, origin.props.style],
      });
    };
    return (
      <AuthProvider>
        <AppNavigator />
      </AuthProvider>
    );
  }
}
