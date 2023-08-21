import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Chat from "./components/Chat";
import styled from "styled-components";
import SideBar from "./components/SideBar";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase";
import Login from "./components/Login";
import Spinner from "react-spinkit";

function App() {
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return (
      <AppLoading>
        <AppLoagingContent>
          <img
            src="https://cdn.iconscout.com/icon/free/png-256/free-slack-4054266-3353008.png?f=webp"
            alt=""
          />

          <Spinner name="ball-spin-fade-loader" color="purple" fade="none" />
        </AppLoagingContent>
      </AppLoading>
    );
  }

  return (
    <div className="app">
      <Router>
        {!user ? (
          <Login />
        ) : (
          <>
            <Header />
            <AppBody>
              <SideBar />
              <Routes>
                <Route exact path="/" element={<Chat />} />
              </Routes>
            </AppBody>
          </>
        )}
      </Router>
    </div>
  );
}

export default App;

const AppBody = styled.div`
  display: flex;
  height: 100vh;
`;

const AppLoading = styled.div``;

const AppLoagingContent = styled.div`
  text-align: center;
  padding-bottom: 20px;
  display: flex;
  align-item: center;
  justify-content: center;
  // flex-direction: column;

  > img {
    height: 100px;
    padding: 40px;
    margin-bottom: 60px;
  }
`;
