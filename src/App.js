import React, { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar";
import AppRoutes from "./AppRoutes";
import JoblyApi from "./JoblyApi";
import UserContext from "./UserContext";
import useLocalStorage from "./hooks/useLocalStorage";
import { jwtDecode } from "jwt-decode";
import "./App.css";

function App() {
  const [token, setToken] = useLocalStorage("jobly-token");
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    async function getCurrentUser() {
      if (token) {
        try {
          let { username } = jwtDecode(token);
          JoblyApi.token = token;
          let currentUser = await JoblyApi.getCurrentUser(username);

          currentUser.applications = currentUser.applications || [];
          
          setCurrentUser(currentUser);
        } catch (err) {
          console.error("Error loading user", err);
          setCurrentUser(null);
        }
      }
    }
    getCurrentUser();
  }, [token]);

  async function login(loginData) {
    try {
      let token = await JoblyApi.login(loginData);
      setToken(token);
      return { success: true};
    } catch (errors) {
      console.error("login failed", errors);
      return { success: false, errors };
    }
  }

  async function signup(signupData) {
    try {
      let token = await JoblyApi.signup(signupData);
      setToken(token);
      return { success: true };
    } catch (errors) {
      console.error("signup failed", errors);
      return { success: false, errors };
    }
  }

  // async function applyToJob(jobId) {
  //   if (currentUser) {
  //     let currentUser = await JoblyApi.applyToJob(currentUser.username, jobId);
  //     setCurrentUser(user => ({
  //       ...user,
  //       applications: [...user.applications, jobId]
  //     }));
  //   }
  // }

  function logout() {
    setCurrentUser(null);
    setToken(null);
  }

  return (
    <BrowserRouter>
      <UserContext.Provider value={{ currentUser, setCurrentUser }}>
        <div className="App">
          <Navbar logout={logout} />
          <AppRoutes login={login} signup={signup} />
        </div>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
