import React, { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import ConvContext from "../../context/ConvContext";

export default function Friend({ friend }) {
  const { setChat } = useContext(ConvContext);
  return (
    <div className={"friend " + friend.active} onClick={() => setChat(friend)}>
      <div className="image">
        {friend.image !== null ? (
          <img src={friend.image} alt="user" />
        ) : (
          <FontAwesomeIcon icon={faUser} />
        )}
      </div>
      <h4>{friend.user.username}</h4>
    </div>
  );
}
