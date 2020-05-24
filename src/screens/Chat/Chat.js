import React from "react";
import { Block, Text } from "../../components/ui";
import { GiftedChat } from "react-native-gifted-chat";
import { AuthContext } from "../../context/authContext";
// import Bubble from "../../../node_modules/react-native-gifted-chat/lib/Bubble";
import * as firebase from "firebase";
import "firebase/firestore";
import Bubble from "./Bubble";

const Chat = ({ navigation, route }) => {
  const { name, description, slug } = route.params;
  const { authState, authActions } = React.useContext(AuthContext);

  const [messages, setMessages] = React.useState([]);

  React.useEffect(() => {
    navigation.setOptions({
      headerTitle: name,
      headerTintColor: "#fff",
    });
    const db = firebase.firestore();
    db.collection("messages")
      .where("slug", "==", slug)
      .onSnapshot(function (querySnapshot) {
        const messages = [];
        querySnapshot.forEach(function (message) {
          const createdAt = message.data().createdAt.toDate();
          messages.push({
            ...message.data(),
            createdAt,
          });
        });
        // console.log(messages);
        setMessages(messages);
      });
  }, []);

  const onSend = (message = []) => {
    console.log(message);
    const db = firebase.firestore();
    message.forEach((mes) => {
      db.collection("messages").add({ ...mes, slug: slug });
    });
    const newMessages = GiftedChat.append(messages, message);
    // console.log(newMessages);
    setMessages(newMessages);
  };

  return (
    <Block safe>
      <GiftedChat
        messages={messages}
        renderUsernameOnMessage={true}
        onSend={(messages) => onSend(messages)}
        user={{
          ...authState.user,
          _id: authState.user.email,
          avatar: authState.user.photoUrl,
        }}
        renderBubble={(props) => <Bubble {...props} />}
      />
    </Block>
  );
};

export default Chat;
