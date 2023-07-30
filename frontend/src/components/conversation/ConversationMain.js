import React, { useContext } from "react";
import Message from "./Message";
import ConvContext from "../../context/ConvContext";

export default function ConversationMain() {
  const { messages, containerRef } = useContext(ConvContext);
  return (
    <div className="conversation-main" ref={containerRef}>
      <div className="messages">
        {messages.map((message) => (
          <Message key={message.id} message={message} />
        ))}
      </div>
    </div>
  );
}
