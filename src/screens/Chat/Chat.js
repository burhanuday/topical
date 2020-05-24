import React from "react";
import { Block, Text } from "../../components/ui";
import { GiftedChat } from "react-native-gifted-chat";
import { AuthContext } from "../../context/authContext";
// import Bubble from "../../../node_modules/react-native-gifted-chat/lib/Bubble";
import Bubble from "./Bubble";

const Chat = ({ navigation, route }) => {
  const { name, description, slug } = route.params;
  const { authState, authActions } = React.useContext(AuthContext);

  const [messages, setMessages] = React.useState([
    {
      _id: 1,
      text: "Hello developer",
      createdAt: new Date(),
      user: {
        _id: 2,
        username:"thing",
        name: "React Native",
        avatar: "https://placeimg.com/140/140/any",
      },
    },
    {
      _id: 4,
      text: "Hello developer",
      createdAt: new Date(),
      user: {
        _id: 4,
        username:"some",
        name: "React Native",
        avatar: "https://placeimg.com/140/140/any",
      },
    },
  ]);

  React.useEffect(() => {
    navigation.setOptions({
      headerTitle: name,
      headerTintColor: "#fff",
    });
  }, []);

  const onSend = (message = []) => {
    const newMessages = GiftedChat.append(messages, message);
    console.log(newMessages);
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
        }}
        renderBubble={(props) => <Bubble {...props} />}
      />
    </Block>
  );
};

export default Chat;
