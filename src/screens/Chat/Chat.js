import React from "react";
import { Block, Text, LoadingIndicator } from "../../components/ui";
import { GiftedChat, Send } from "react-native-gifted-chat";
import { AuthContext } from "../../context/authContext";
import { Ionicons } from "@expo/vector-icons";
import * as firebase from "firebase";
import "firebase/firestore";
import Bubble from "./Bubble";
import { COLORS } from "../../components/ui/theme";

const Chat = ({ navigation, route }) => {
  const { name, description, slug } = route.params;
  const { authState, authActions } = React.useContext(AuthContext);

  const [messages, setMessages] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    navigation.setOptions({
      headerTitle: name,
      headerTintColor: "#fff",
    });

    setLoading(true);
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
        const sortedMessages = messages.sort(
          (a, b) => b.createdAt - a.createdAt
        );
        setMessages(sortedMessages);
        setLoading(false);
      });
  }, []);

  const onSend = (sentMessages = []) => {
    const db = firebase.firestore();
    const batch = db.batch();
    const messagesRef = db.collection("messages");
    sentMessages.forEach((message) => {
      const messageRef = messagesRef.doc(message._id);
      batch.set(messageRef, { ...message, slug: slug });
    });
    batch.commit();
  };

  if (loading) {
    return (
      <Block safe center middle>
        <LoadingIndicator />
      </Block>
    );
  }

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
        inverted={true}
        renderBubble={(props) => <Bubble {...props} />}
        renderSend={(props) => (
          <Send {...props}>
            <Block flex={0} center middle marginRight={15}>
              <Ionicons name="md-send" size={32} color={COLORS.primary} />
            </Block>
          </Send>
        )}
      />
    </Block>
  );
};

export default Chat;
