import React from "react";
import ConvContext from "../context/ConvContext";
import { useContext } from "react";
import SearchNewFriends from "./conversation/SearchNewFriends";
import ConversationHeader from "./conversation/ConversationHeader";
import ConversationMain from "./conversation/ConversationMain";
import ConversationFooter from "./conversation/ConversationFooter";

export default function Conversation() {
  const { chat } = useContext(ConvContext);

  return (
    <div className="conversation">
      {chat === null ? (
        <SearchNewFriends />
      ) : (
        <>
          <ConversationHeader />
          <ConversationMain />
          <ConversationFooter />
        </>
      )}
    </div>
  );
}
