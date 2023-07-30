import React, { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import AuthContext from "../../context/AuthContext";

export default function Message({ message }) {
  const { user } = useContext(AuthContext);
  let senderClass =
    message.sender.user.username === user.username ? "me" : "other";
  return (
    <div className={"message " + senderClass}>
      <div className="conv-image">
        {senderClass === "other" && message.sender.image !== null ? (
          <img src={message.sender.image} alt="user" />
        ) : (
          senderClass === "other" && <FontAwesomeIcon icon={faUser} />
        )}
      </div>
      <div className="content"> {message.content} </div>
    </div>
  );
}
