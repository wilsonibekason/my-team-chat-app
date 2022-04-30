import React, { useState } from "react";
import { StreamChat } from "stream-chat";
import { Chat } from "stream-chat-react";
import Cookies from "universal-cookie";
import { Auth, ChannelContainer, ChannelListContainer } from "./component";
import "stream-chat-react/dist/css/index.css";
import "./App.css";

const cookies = new Cookies();
const apiKey = "tgwqw39aubjp";
/// create an authtoken for login verifications
const authToken = cookies.get("token");
const client = StreamChat.getInstance(apiKey);
if (authToken) {
  client.connectUser(
    {
      name: cookies.get("username"),
      fullName: cookies.get("fullName"),
      id: cookies.get("userId"),
      phoneNumber: cookies.get("phoneNumber"),
      image: cookies.get("avatarURL"),
      hashedPassword: cookies.get("hashedPassword"),
    },
    authToken
  );
}
const App = () => {
  const [createType, setCreateType] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  if (!authToken) return <Auth />;
  return (
    <div className="app__wrapper">
      <Chat client={client} theme="team light">
        <ChannelListContainer
          isCreating={isCreating}
          setIsCreating={setIsCreating}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          setCreateType={setCreateType}
        />
        <ChannelContainer
          createType={createType}
          isCreating={isCreating}
          setIsCreating={setIsCreating}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
        />
      </Chat>
    </div>
  );
};

export default App;
