import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

export default function Logout() {
  const { LogoutUser } = useContext(AuthContext);
  return (
    <Link className="logout" onClick={() => LogoutUser()} to="/login">
      <span>Logout</span>
      <span>
        <FontAwesomeIcon icon={faArrowRightFromBracket} />
      </span>
    </Link>
  );
}
