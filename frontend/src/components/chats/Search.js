import React, { useContext, useState } from "react";
import ChatContext from "../../context/ChatContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

import Person from "./Person";

export default function Search() {
  const {
    searchFriends,
    searchFr,
    focusSearch,
    setFocusSearch,
    animation,
    setAnimation,
  } = useContext(ChatContext);

  const [searchDisplay, setSearchDisplay] = useState("block");
  const [moseHover, setMouseHover] = useState(false);
  const [isBlur, setBlur] = useState(true);
  return (
    <div
      className="search"
      onFocus={() => {
        setSearchDisplay("block");
        setBlur(false);
      }}
      onBlur={() => {
        if (!moseHover) {
          setSearchDisplay("none");
        }
        setBlur(true);
      }}
    >
      <form className="search-friend-form">
        <input
          type="text"
          placeholder="Search friend"
          name="search"
          ref={(input) => {
            if (focusSearch && input) {
              input.focus();
              setFocusSearch(false);
            }
          }}
          onChange={(e) => searchFriends(e)}
        />
        <button className={animation} onAnimationEnd={() => setAnimation("")}>
          <FontAwesomeIcon icon={faMagnifyingGlass} />{" "}
        </button>
      </form>
      <div
        className="search-result"
        onMouseEnter={() => setMouseHover(true)}
        onMouseLeave={() => {
          if (isBlur) {
            setSearchDisplay("none");
          }
          setMouseHover(false);
        }}
        style={{ display: searchDisplay }}
      >
        {searchFr.map((person) => (
          <Person key={person.user.id} person={person} />
        ))}
      </div>
    </div>
  );
}
