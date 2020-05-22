import React, { useState, useEffect } from "react";
import { Image } from "react-native";
import { Block, Text } from "../../components/ui";
import { AuthContext } from "../../context/authContext";

const Topics = ({ navigation }) => {
  const { authState, authActions } = React.useContext(AuthContext);
  const user = authState.user;

  return (
    <Block safe>
      <Block primary flex={0} paddingHorizontal={20} row paddingBottom={12}>
        {user.photoUrl && (
          <Image
            style={{ height: 32, width: 32, borderRadius: 16, marginRight: 12 }}
            source={{
              uri: user.photoUrl,
            }}
          />
        )}
        <Text bold h2 white>
          {user.name}
        </Text>
      </Block>
    </Block>
  );
};

export default Topics;
