import React, { useState, useEffect } from "react";
import { Image } from "react-native";
import { Block, Text } from "../../components/ui";
import { AuthContext } from "../../context/authContext";
import * as firebase from "firebase";
import "firebase/firestore";
import TopicListItem from "./TopicListItem/TopicListItem";

const Topics = ({ navigation }) => {
  const { authState, authActions } = React.useContext(AuthContext);
  const user = authState.user;
  const [topics, setTopics] = React.useState([]);

  useEffect(() => {
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
      });
  }, []);

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

      <Block paddingHorizontal={10} marginTop={15}>
        <Text h2 bold marginBottom={10}>
          Topics
        </Text>
        {topics.map((topic) => {
          return (
            <TopicListItem
              key={topic.slug}
              title={topic.name}
              description={topic.description}
              navigation={navigation}
            />
          );
        })}
      </Block>
    </Block>
  );
};

export default Topics;
