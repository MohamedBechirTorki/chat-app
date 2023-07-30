import React from "react";
import { useContext } from "react";
import ChatContext from "../../context/ChatContext";

export default function SearchNewFriends() {
  const { setFocusSearch, setAnimation } = useContext(ChatContext);
  return (
    <div className="search-new-friends">
      <button
        onClick={async () => {
          setFocusSearch(true);
          setAnimation("animation");
        }}
      >
        Search new friends
      </button>
    </div>
  );
}
