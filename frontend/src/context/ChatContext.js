import { createContext, useState, useEffect, useContext } from "react";
import AuthContext from "./AuthContext";
import ConvContext from "./ConvContext";

const ChatContext = createContext();
export default ChatContext;

export const ChatProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [friends, setFriends] = useState([]);
  const [searchFr, setSearchFr] = useState([]);

  const [focusSearch, setFocusSearch] = useState(false);
  const [animation, setAnimation] = useState("");
  const { token, user } = useContext(AuthContext);
  const { setChat } = useContext(ConvContext);
  const searchFriends = async (e) => {
    e.preventDefault();
    let response = await fetch("search/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + String(token.access),
      },
      body: JSON.stringify({ search_query: e.target.value }),
    });
    let data = await response.json();
    let searchFriends = [];
    data.forEach((person) => {
      let find = false;
      let i = 0;
      while (!find && i < friends.length) {
        if (friends[i].user.id === person.user.id) {
          find = true;
        } else {
          i++;
        }
      }
      if (!find) {
        searchFriends.push(person);
      }
    });
    setSearchFr(searchFriends);
  };

  useEffect(() => {
    const fetchFriends = async () => {
      let response = await fetch("conversations/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + String(token.access),
        },
      });
      let data = await response.json();
      console.log(data);
      if (response.status === 200) {
        let array = [];
        for (let i = 0; i < data.length; i++) {
          let participants = data[i].participants;
          participants[0].user.username !== user.username
            ? array.push(participants[0])
            : array.push(participants[1]);

          array[i].convId = data[i].id;
        }
        setFriends(array);
        setLoading(false);
        if (array.length !== 0) {
          setChat(array[0]);
        }
      }
    };
    fetchFriends();
  }, []);

  const contextData = {
    searchFriends: searchFriends,
    friends: friends,
    setFriends: setFriends,
    searchFr: searchFr,
    setSearchFr: setSearchFr,
    focusSearch: focusSearch,
    setFocusSearch: setFocusSearch,
    animation: animation,
    setAnimation: setAnimation,
  };

  return (
    <ChatContext.Provider value={contextData}>
      {loading ? <h3>Loading ...</h3> : <>{children}</>}
    </ChatContext.Provider>
  );
};
