import React, { useState, useEffect } from "react";
import { Image, FlatList, TouchableOpacity, AsyncStorage } from "react-native";
import { Block, Text, LoadingIndicator } from "../../components/ui";
import { AuthContext } from "../../context/authContext";
import * as firebase from "firebase";
import "firebase/firestore";
import TopicListItem from "./TopicListItem/TopicListItem";
import { Ionicons } from "@expo/vector-icons";

const Topics = ({ navigation }) => {
  const { authState, authActions } = React.useContext(AuthContext);
  const user = authState.user;
  const [topics, setTopics] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={async () => {
            await AsyncStorage.removeItem("@user");
            authActions.authStateChanged(null);
            console.log(authState);
          }}
          style={{
            marginRight: 10,
          }}
        >
          <Ionicons name="md-exit" size={28} color="white" />
        </TouchableOpacity>
      ),
    });

    setLoading(true);
    const db = firebase.firestore();
    console.log(user);
    db.collection("users").doc(user.email).set(user);

    const topics = [];
    db.collection("topics")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          // console.log(doc.id, "=>", doc.data());
          topics.push(doc.data());
        });
        setTopics(topics);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <Block safe center middle>
        <LoadingIndicator />
      </Block>
    );
  }

  return (
    <Block safe>
      <Block primary flex={0} paddingHorizontal={20} row paddingBottom={12}>
        {user && user.photoUrl && (
          <Image
            style={{ height: 32, width: 32, borderRadius: 16, marginRight: 12 }}
            source={{
              uri: (user && user.photoUrl) || "",
            }}
          />
        )}
        <Text bold h2 white>
          {user && user.name}
        </Text>
      </Block>

      <Block marginTop={15}>
        <Text marginLeft={15} h2 bold marginBottom={10}>
          Topics
        </Text>

        <FlatList
          data={topics}
          renderItem={({ item }) => (
            <TopicListItem
              key={item.slug}
              title={item.name}
              description={item.description}
              navigation={navigation}
              slug={item.slug}
            />
          )}
          keyExtractor={(item) => item.slug}
        />
      </Block>
    </Block>
  );
};

export default Topics;
