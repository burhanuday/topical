import * as React from "react";
import { Dimensions, StyleSheet, Image, StatusBar } from "react-native";
import { Block, Text, Button } from "../../components/ui";
import Svg, { Circle } from "react-native-svg";
import Constants from "expo-constants";
import { COLORS } from "../../components/ui";
import * as Google from "expo-google-app-auth";
import { AsyncStorage } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { AuthContext } from "../../context/authContext";
import icon from "../../../assets/icon.png";
import {
  androidClientId,
  androidStandaloneAppClientId,
} from "../../../secrets/googleClientIds";
// import * as GoogleSignIn from "expo-google-sign-in";
import * as AppAuth from "expo-app-auth";

const statusBarHeight = Constants.statusBarHeight;
const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

async function signInWithGoogleAsync() {
  try {
    const result = await Google.logInAsync({
      androidClientId: androidClientId,
      androidStandaloneAppClientId: androidStandaloneAppClientId,
      scopes: ["profile", "email"],
      behavior: "web",
      redirectUrl: `${AppAuth.OAuthRedirect}:/oauth2redirect/google`,
    });

    if (result.type === "success") {
      return result;
    } else {
      return false;
    }
  } catch (e) {
    return false;
  }
}

const Login = ({ navigation }) => {
  const { authState, authActions } = React.useContext(AuthContext);

  /* const initAsync = async () => {
    await GoogleSignIn.initAsync();
  };

  const signInAsync = async () => {
    try {
      await GoogleSignIn.askForPlayServicesAsync();
      const { type, user } = await GoogleSignIn.signInAsync();
      if (type === "success") {
        console.log(user);
      }
    } catch ({ message }) {
      alert("login: Error:" + message);
    }
  };

  React.useEffect(() => {
    const init = async () => {
      await initAsync();
    };
    init();
  }, []); */

  return (
    <Block paddingTop={statusBarHeight}>
      <StatusBar backgroundColor={COLORS.white} barStyle="dark-content" />
      <Block
        style={[
          { ...StyleSheet.absoluteFillObject },
          {
            paddingTop: statusBarHeight + 100,
            marginLeft: deviceWidth / 2 - 75,
          },
        ]}
      >
        <Image
          style={{
            height: 150,
            width: 150,
          }}
          source={icon}
        />
      </Block>
      <Block center marginTop={deviceHeight / 2 + 100}>
        <Text white h1 bold>
          TOPICAL
        </Text>
        <Text paddingTop={10} white h3 bold subtitle>
          Login with Google to get started
        </Text>

        <Button
          white
          marginTop={20}
          onPress={async () => {
            const _authState = await signInWithGoogleAsync();
            console.log(_authState);
            // setAuthState(_authState);
            // user.email user.name user.id user.photoUrl accessToken
            const user = {
              ..._authState.user,
              accessToken: _authState.accessToken,
            };
            if (_authState) {
              await AsyncStorage.setItem("@user", JSON.stringify(user));
              authActions.authStateChanged(user);
            }
          }}
        >
          <Block row paddingHorizontal={15} paddingVertical={8} center middle>
            <Ionicons name="logo-google" size={32} color={COLORS.primary} />
            <Text primary bold h3 marginLeft={10}>
              Sign in with Google
            </Text>
          </Block>
        </Button>
      </Block>
      <Block style={[{ ...StyleSheet.absoluteFillObject }, { zIndex: -1 }]}>
        <Svg height="100%" width="100%">
          <Circle
            cx={deviceWidth / 2}
            cy={deviceHeight + 40}
            r={deviceWidth / 2 + 150}
            fill={COLORS.primary}
          />
        </Svg>
      </Block>
    </Block>
  );
};

export default Login;
