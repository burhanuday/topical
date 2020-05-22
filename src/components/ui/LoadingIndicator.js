import React from "react";
import { ActivityIndicator } from "react-native";
import Block from "./Block";
import { COLORS } from "./theme";

const LoadingIndicator = props => {
  return (
    <Block center middle>
      <ActivityIndicator color={COLORS.primary} size={props.size || "large"} />
    </Block>
  );
};

export default LoadingIndicator;
