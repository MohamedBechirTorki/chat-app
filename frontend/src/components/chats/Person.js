import React, { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import ChatContext from "../../context/ChatContext";
import AuthContext from "../../context/AuthContext";
import ConvContext from "../../context/ConvContext";

export default function Person({ person }) {
  const { friends, setFriends, searchFr, setSearchFr } =
    useContext(ChatContext);
  const { setChat } = useContext(ConvContext);
  const { token } = useContext(AuthContext);

  const startConversation = async (person) => {
    let username = person.user.username;
    let response = await fetch("start-conversation/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + String(token.access),
      },
      body: JSON.stringify({ username: username }),
    });
    let data = await response.json();
    if (response.status === 200) {
      setFriends([{ convId: data.id, ...person }, ...friends]);
      setChat({ convId: data.id, ...person });
      setSearchFr(searchFr.filter((someone) => someone !== person));
    }
  };

  return (
    <div className={"friend notFriend"}>
      <div className="image">
        {person.image !== null ? (
          <img src={person.image} alt="user" />
        ) : (
          <FontAwesomeIcon icon={faUser} />
        )}
      </div>
      <h4>
        {person.user.username.length <= 10
          ? person.user.username
          : person.user.username.substr(0, 7) + "..."}
      </h4>
      <div className="start-conv" onClick={() => startConversation(person)}>
        <FontAwesomeIcon icon={faUserPlus} />
      </div>
    </div>
  );
}
