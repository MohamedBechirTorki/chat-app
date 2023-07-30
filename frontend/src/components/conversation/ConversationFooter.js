import React, { useState, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import ConvContext from "../../context/ConvContext";
import AuthContext from "../../context/AuthContext";

export default function ConversationFooter() {
  const { chat } = useContext(ConvContext);
  const { token } = useContext(AuthContext);
  const [message, setMessage] = useState("");
  const sendMessage = async (e) => {
    e.preventDefault();
    let response = await fetch(`send-message/${chat.convId}/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + String(token.access),
      },
      body: JSON.stringify({ content: message }),
    });
    let data = await response.json();
    setMessage("");
  };
  return (
    <div className="conversation-footer">
      <form onSubmit={(e) => sendMessage(e)}>
        <input
          type="text"
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Hello"
          value={message}
        />
        <button className="button">
          <FontAwesomeIcon icon={faPaperPlane} />
        </button>
      </form>
    </div>
  );
}
