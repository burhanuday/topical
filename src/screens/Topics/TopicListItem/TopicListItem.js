import React from "react";
import { Block, Text, COLORS } from "../../../components/ui";
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
      <Block flex={0} radius={8} paddingVertical={12} row center>
        <Block
          marginLeft={15}
          marginRight={10}
          radius={30}
          color="rgba(20, 33, 100, 0.2)"
          opacity={0.8}
          height={50}
          width={50}
          flex={0}
          center middle
        >
          <Ionicons name={props.icon} size={32} color="rgba(20, 33, 61, 0.9)" />
        </Block>
        <Block>
          <Text h3 bold color="#3b3b3b">
            {props.title}
          </Text>
          <Text color="#666">{props.description}</Text>
        </Block>
        <Block marginRight={15} marginLeft={10} center middle flex={0}>
          <Ionicons name="ios-arrow-forward" size={22} color="#3333" />
        </Block>
      </Block>
    </TouchableOpacity>
  );
};

export default TopicListItem;
