import React from "react";
import { Block, Text } from "../../../components/ui";
import { Ionicons } from "@expo/vector-icons";

const TopicListItem = (props) => {
  return (
    <Block
      color="#e8e8e8"
      borderColor="#d4d4d4"
      borderWidth={1}
      flex={0}
      radius={8}
      paddingHorizontal={15}
      paddingVertical={12}
      row
    >
      <Block>
        <Text h3 bold color="#3b3b3b">
          {props.title}
        </Text>
        <Text color="#666">{props.description}</Text>
      </Block>
      <Block center middle flex={0}>
        <Ionicons name="ios-arrow-forward" size={32} color="#3333" />
      </Block>
    </Block>
  );
};

export default TopicListItem;
