import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

export default function LoginPage() {
  let [username, setUsername] = useState("");
  let [password, setPassword] = useState("");
  let { LoginUser } = useContext(AuthContext);
  return (
    <div className="login-register">
      <form onSubmit={(e) => LoginUser(e)}>
        <h3>Login</h3>
        <div>
          <label htmlFor="username">Username</label>
          <input
            required
            name="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            required
            minLength="8"
            maxLength="20"
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <input type="submit" value="Login" />
        <Link to="/register">I dont have account</Link>
      </form>
    </div>
  );
}
