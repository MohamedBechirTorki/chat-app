import React, { useContext } from "react";
import ChatContext from "../context/ChatContext";

import Search from "./chats/Search";
import Friend from "./chats/Friend";

export default function Chats() {
  const { friends } = useContext(ChatContext);

  return (
    <div className="chats">
      <h2>Chats</h2>
      <div className="friends">
        <Search />
        <div className="friends-number">
          <h3>Friends</h3> <span>{friends.length}</span>
        </div>
        {friends.map((friend) => (
          <Friend key={friend.user.id} friend={friend} />
        ))}
      </div>
    </div>
  );
}
