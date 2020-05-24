import * as React from "react";
import { View, Text, AsyncStorage } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { AuthContext } from "../context/authContext";

import Login from "../screens/Login/Login";
import Topics from "../screens/Topics/Topics";
import Chat from "../screens/Chat/Chat";
import { COLORS } from "../components/ui";

const Stack = createStackNavigator();

const AppNavigator = () => {
  const { authState, authActions } = React.useContext(AuthContext);

  React.useEffect(() => {
    authActions.authStateChanged();
  }, []);

  return (
    <NavigationContainer>
      {console.log("authState", authState)}
      <Stack.Navigator
        initialRouteName="Topics"
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
        {!authState.user && (
          <Stack.Screen
            options={{ header: () => null }}
            name="Login"
            component={Login}
          />
        )}
        {authState.user && (
          <>
            <Stack.Screen
              options={{
                headerTitle: "Topical",
              }}
              name="Topics"
              component={Topics}
            />
            <Stack.Screen
              options={{ headerTitle: "Chat" }}
              name="Chat"
              component={Chat}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
