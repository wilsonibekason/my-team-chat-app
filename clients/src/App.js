import React from "react";
import { StreamChat } from "stream-chat";
import { Chat } from "stream-chat-react";
import Cookies from "universal-cookie";
import { Auth, ChannelContainer, ChannelListContainer } from "./component";
import "./App.css";

const apiKey = "tgwqw39aubjp";
const client = StreamChat.getInstance(apiKey);
/// create an authtoken for login verifications
const authToken = false;
const App = () => {
  if (!authToken) return <Auth />;
  return (
    <div className="app__wrapper">
      <Chat client={client} theme="team light">
        <ChannelListContainer />
        <ChannelContainer />
      </Chat>
    </div>
  );
};

export default App;
