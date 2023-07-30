import "./App.css";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from "./utils/PrivateRoute";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <div className="App container">
      <Router>
        <AuthProvider>
          <Routes>
            <Route
              path="/"
              exact
              element={<PrivateRoute component={HomePage} />}
            />
            <Route path="/login" Component={LoginPage} />
            <Route path="/register" Component={SignUpPage} />
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
