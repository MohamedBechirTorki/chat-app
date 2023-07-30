import { createContext, useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();
export default AuthContext;

export const AuthProvider = ({ children }) => {
  const loginUrl = "token/";
  const refreshUrl = "token/refresh/";
  let [user, setUser] = useState(
    localStorage.getItem("AuthToken")
      ? jwt_decode(JSON.parse(localStorage.getItem("AuthToken")).access)
      : null
  );
  let [token, setToken] = useState(
    localStorage.getItem("AuthToken")
      ? JSON.parse(localStorage.getItem("AuthToken"))
      : null
  );
  const navigate = useNavigate();

  const LoginUser = async (e) => {
    e.preventDefault();

    let response = await fetch(loginUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: e.target.username.value,
        password: e.target.password.value,
      }),
    });
    let data = await response.json();
    if (response.status === 200) {
      console.log(data);
      setToken(data);
      setUser(jwt_decode(data.access));
      navigate("/");
      localStorage.setItem("AuthToken", JSON.stringify(data));
    }
    console.log(response.status);
  };
  const signUpUser = async (e) => {
    e.preventDefault();
    let response = await fetch("create-account/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: e.target.username.value,
        password: e.target.password.value,
      }),
    });
    if (response.status === 200) {
      let data = await response.json();
      console.log(data);
      LoginUser(e);
    }
  };
  const LogoutUser = () => {
    setUser(null);
    setToken(null);
    localStorage.clear();
  };
  const contextData = {
    signUpUser: signUpUser,
    LoginUser: LoginUser,
    LogoutUser: LogoutUser,
    user: user,
    token: token,
  };
  const updateToken = async () => {
    if (!localStorage.getItem("AuthToken")) {
      navigate("/login");
    } else {
      let response = await fetch(refreshUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          refresh: JSON.parse(localStorage.getItem("AuthToken")).refresh,
        }),
      });
      let data = await response.json();
      setToken(data);
      setUser(jwt_decode(data.access));
      localStorage.setItem("AuthToken", JSON.stringify(data));
    }
  };

  useEffect(() => {
    updateToken();
    const interval = setInterval(() => {
      updateToken();
    }, 240000);
    return () => clearInterval(interval);
  }, []);
  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};
