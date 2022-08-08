import { BrowserRouter, Route, Link, Routes } from "react-router-dom";
import { useState, useEffect } from "react";

import Register from "./Register";
import Login from "./Login";
import Home from "./Home";
import userContext from "./userContext";
import axios from "axios";
import "./App.css";

function App() {
  const [email, setEmail] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        const { data } = await axios.get("http://localhost:4000/api/user", {
          headers: { token: user.token },
        });
        setEmail(data.email);
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchData();
  }, []);

  async function logout() {
    try {
      const token = JSON.parse(localStorage.getItem("user")).token;
      await axios.get("http://localhost:4000/api/logout", {
        headers: { token },
      });
      setEmail("");
      localStorage.removeItem("user");
    } catch (error) {
      console.log("error", error);
    }
  }

  return (
    <userContext.Provider value={{ email, setEmail }}>
      <BrowserRouter>
        <nav>
          <Link to="/home">Home</Link>
          {!!email && (
            <button
              onClick={(e) => {
                e.preventDefault();
                logout();
              }}
            >
              Log out
            </button>
          )}
          {!email && (
            <>
              <Link to="/register">Register</Link>
              <Link to="/login">Login</Link>
            </>
          )}
        </nav>
        <main>
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </main>
      </BrowserRouter>
    </userContext.Provider>
  );
}

export default App;
