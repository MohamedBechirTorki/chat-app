import { createContext, useContext, useState, useEffect, useRef } from "react";
import AuthContext from "./AuthContext";

const ConvContext = createContext();
export default ConvContext;

export const ConvProvider = ({ children }) => {
  const [chat, setChat] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [messages, setMessages] = useState([]);
  const { token } = useContext(AuthContext);
  const containerRef = useRef(null);
  const scrollToBottom = () => {
    if (containerRef.current) {
      const { scrollHeight, clientHeight } = containerRef.current;
      containerRef.current.scrollTop = scrollHeight - clientHeight;
    }
  };

  const contextData = {
    chat: chat,
    setChat: setChat,
    messages: messages,
    setMessages: setMessages,
    containerRef: containerRef,
  };

  useEffect(() => {
    const getMessages = async (type) => {
      if (chat !== null) {
        let response = await fetch(`get-messages/${chat.convId}/`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + String(token.access),
          },
        });
        let data = await response.json();
        setMessages(data);

        if (type === "get") {
          scrollToBottom();
        }
      }
    };
    getMessages("get");
    const inter = setInterval(() => getMessages("update"), 500);
    return () => clearInterval(inter);
  }, [chat]);

  return (
    <ConvContext.Provider value={contextData}>{children}</ConvContext.Provider>
  );
};
