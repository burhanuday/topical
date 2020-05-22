import React from "react";
import { Dimensions, StyleSheet } from "react-native";
import { Block, Text } from "../../components/ui";
import Svg, { Circle } from "react-native-svg";
import Constants from "expo-constants";
import { COLORS } from "../../components/ui";

const statusBarHeight = Constants.statusBarHeight;
const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

const Login = () => {
  return (
    <Block paddingTop={statusBarHeight}>
      <Block
        style={[
          { ...StyleSheet.absoluteFillObject },
          { paddingTop: statusBarHeight + 200 },
        ]}
      >
        <Text primary>Add logo here later</Text>
      </Block>
      <Block center marginTop={deviceHeight / 2 + 100}>
        <Text white h1 bold spacing={1}>
          TOPICAL
        </Text>
        <Text paddingTop={10} white h3 bold subtitle>
          Login with Google to get started
        </Text>
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
