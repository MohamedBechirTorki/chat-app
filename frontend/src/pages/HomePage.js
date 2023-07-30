import React from "react";
import Chats from "../components/Chats";
import Conversation from "../components/Conversation";
import Logout from "../components/Logout";
import { ChatProvider } from "../context/ChatContext";
import { ConvProvider } from "../context/ConvContext";
export default function HomePage() {
  return (
    <div className="home">
      <ConvProvider>
        <ChatProvider>
          <Chats />
          <Conversation />
        </ChatProvider>
      </ConvProvider>
      <Logout />
    </div>
  );
}
