import React from "react";
import { Block, Text } from "../../../components/ui";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";

const TopicListItem = (props) => {
  return (
    <TouchableOpacity
      onPress={() => {
        props.navigation.push("Chat", {
          slug: props.slug,
          name: props.title,
          description: props.description,
        });
      }}
    >
      <Block
        color="rgba(20, 10, 150, 0.05)"
        borderColor="#d4d4d4"
        borderWidth={1}
        flex={0}
        radius={8}
        paddingHorizontal={15}
        paddingVertical={12}
        marginBottom={7}
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
    </TouchableOpacity>
  );
};

export default TopicListItem;
