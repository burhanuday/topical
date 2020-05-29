import React from "react";
import { Block, Text, LoadingIndicator } from "../../components/ui";
import { GiftedChat, Send } from "react-native-gifted-chat";
import { AuthContext } from "../../context/authContext";
import { Ionicons } from "@expo/vector-icons";
import * as firebase from "firebase";
import "firebase/firestore";
import "firebase/storage";
import Bubble from "./Bubble";
import { COLORS } from "../../components/ui/theme";
import { TouchableOpacity } from "react-native";
import * as ImagePicker from "expo-image-picker";

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
    console.log(sentMessages);
    const db = firebase.firestore();
    const batch = db.batch();
    const messagesRef = db.collection("messages");
    sentMessages.forEach((message) => {
      const messageRef = messagesRef.doc();
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
      <Block
        white
        flex={0}
        color="#e2e2e2"
        paddingHorizontal={10}
        paddingVertical={5}
      >
        <Text subtitle center color="#848484">
          Remember to stay civil during conversations
        </Text>
      </Block>
      <GiftedChat
        messages={messages}
        renderUsernameOnMessage={true}
        onSend={(messages) => onSend(messages)}
        user={{
          ...authState.user,
          _id: authState.user.email,
          avatar: authState.user.photoUrl,
        }}
        renderChatEmpty={() => (
          <Block
            marginBottom={30}
            style={{ transform: [{ scaleY: -1 }] }}
            flex={1}
          >
            <Text center primary>
              Start a conversation by sending the first message
            </Text>
          </Block>
        )}
        renderBubble={(props) => <Bubble {...props} />}
        renderSend={(props) => (
          <Send {...props}>
            <Block flex={0} center middle marginRight={15}>
              <Ionicons name="md-send" size={32} color={COLORS.primary} />
            </Block>
          </Send>
        )}
        renderActions={(props) => (
          <TouchableOpacity
            onPress={async () => {
              console.log("clicked");
              // await ImagePicker.requestCameraPermissionsAsync();
              try {
                let result = await ImagePicker.launchImageLibraryAsync({
                  mediaTypes: ImagePicker.MediaTypeOptions.Images,
                  quality: 0,
                });
                if (!result.cancelled) {
                  // this.setState({ image: result.uri });
                  const fileName = `${slug}_${new Date().valueOf()}_${result.uri
                    .split("/")
                    .pop()}`;
                  console.log(fileName);
                  const storage = firebase.storage();
                  const storageRef = storage.ref();
                  const imageRef = storageRef.child("images/" + fileName);

                  const response = await fetch(result.uri);
                  const blob = await response.blob();

                  const uploadTask = imageRef.put(blob);

                  uploadTask.on(
                    "state_changed",
                    function (snapshot) {
                      // Observe state change events such as progress, pause, and resume
                      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                      let progress =
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                      console.log("Upload is " + progress + "% done");
                      switch (snapshot.state) {
                        case firebase.storage.TaskState.PAUSED: // or 'paused'
                          console.log("Upload is paused");
                          break;
                        case firebase.storage.TaskState.RUNNING: // or 'running'
                          console.log("Upload is running");
                          break;
                      }
                    },
                    function (error) {
                      // Handle unsuccessful uploads
                    },
                    function () {
                      uploadTask.snapshot.ref
                        .getDownloadURL()
                        .then(function (downloadURL) {
                          console.log("File available at", downloadURL);
                          const db = firebase.firestore();
                          const batch = db.batch();
                          const messagesRef = db.collection("messages");
                          const messageRef = messagesRef.doc();
                          batch.set(messageRef, {
                            user: {
                              ...authState.user,
                              _id: authState.user.email,
                              avatar: authState.user.photoUrl,
                            },
                            image: downloadURL,
                            slug: slug,
                            createdAt: firebase.firestore.Timestamp.fromDate(
                              new Date()
                            ),
                            _id: fileName,
                          });
                          batch.commit();
                        });
                    }
                  );
                }

                console.log(result);
              } catch (E) {
                console.log(E);
              }
            }}
          >
            <Block flex={0} {...props} marginLeft={10}>
              <Ionicons name="md-attach" size={32} color={COLORS.primary} />
            </Block>
          </TouchableOpacity>
        )}
      />
    </Block>
  );
};

export default Chat;
