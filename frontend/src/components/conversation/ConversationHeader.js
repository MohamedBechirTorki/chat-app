import React, { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleInfo,
  faUser,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import AuthContext from "../../context/AuthContext";
import ConvContext from "../../context/ConvContext";
import ChatContext from "../../context/ChatContext";

export default function ConversationHeader() {
  const { setChat, chat } = useContext(ConvContext);
  const { token } = useContext(AuthContext);
  const { friends, setFriends } = useContext(ChatContext);
  const deleteConversation = async () => {
    await fetch(`delete-conversation/${chat.convId}/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + String(token.access),
      },
    });
    setFriends(friends.filter((friend) => friend.convId !== chat.convId));
    setChat(
      friends.filter((friend) => friend.convId !== chat.convId)[0] || null
    );
  };

  return (
    <div className="conversation-header">
      <div className="friend active">
        <div className="image">
          {chat.image !== null ? (
            <img src={chat.image} alt="user" />
          ) : (
            <FontAwesomeIcon icon={faUser} />
          )}
        </div>
        <div className="friend-d">
          <h4>{chat.user.username}</h4>
          <p className="active-info">Active now</p>
        </div>
      </div>
      <div className="icons">
        <div className="trash" onClick={() => deleteConversation()}>
          <FontAwesomeIcon icon={faTrash} />
        </div>
        <div className="info">
          <FontAwesomeIcon icon={faCircleInfo} />
        </div>
      </div>
    </div>
  );
}
