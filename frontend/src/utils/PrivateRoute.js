import { Navigate } from "react-router";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { user } = useContext(AuthContext);
  return user ? <Component /> : <Navigate to="/login" />;
};

export default PrivateRoute;
