import React, { useState } from "react";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

export default function SignUpPage() {
  let [username, setUsername] = useState("");
  let [password, setPassword] = useState("");
  let { signUpUser } = useContext(AuthContext);
  return (
    <div className="login-register">
      <form onSubmit={(e) => signUpUser(e)}>
        <h3>Register</h3>
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

        <input type="submit" value="Sign up" />
      </form>
    </div>
  );
}
