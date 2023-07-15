import React, { useState } from "react";
import TestResultsForm from "./components/TestResultsForm";
import "./App.css";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === "user" && password === "123456") {
      setLoggedIn(true);
      setUsername("");
      setPassword("");
      setError("");
    } else {
      setError("Invalid username or password");
    }
  };

  const handleLogout = () => {
    setLoggedIn(false);
  };

  return (
    <div className="app">
      {!loggedIn ? (
        <div className="login-container">
          <h1>Login</h1>
          <form onSubmit={handleLogin}>
            <label>
              Username:
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </label>
            <label>
              Password:
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
            <button className="click-button" type="submit">
              Login
            </button>
            {error && <p className="error">{error}</p>}
          </form>
        </div>
      ) : (
        <div className="loggedIn-container">
          <button className="click-button" onClick={handleLogout}>
            Logout
          </button>
          <TestResultsForm />
        </div>
      )}
    </div>
  );
}

export default App;
