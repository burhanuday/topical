import * as React from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Login from "../screens/Login/Login";
import { COLORS } from "../components/ui";

const Stack = createStackNavigator();

function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerTitleStyle: {
            fontWeight: "bold",
            color: "white",
            fontSize: 22,
            // ...Platform.select({
            //   ios: { fontFamily: "Arial" },
            //   android: { fontFamily: "Roboto" },
            // }),
          },
          headerStyle: {
            shadowColor: "transparent",
            shadowRadius: 0,
            shadowOffset: {
              height: 0,
            },
            backgroundColor: COLORS.primary,
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 0,
          },
        }}
      >
        <Stack.Screen
          options={{ header: () => null }}
          name="Login"
          component={Login}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
