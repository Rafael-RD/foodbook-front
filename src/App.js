import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage.js";
import AuthContext from "./context/auth.context.js";
import styled from "styled-components";
import { useState } from "react";
import RegisterPage from "./pages/RegisterPage/RegisterPage.js";
import UserPage from "./pages/UserPage/UserPage.js";

export default function App() {
  const [userInfo, setUserInfo]=useState({token: "", username: "", photo: ""})

  return (
    <MyPage>
      <BrowserRouter>
        <AuthContext.Provider value={{userInfo, setUserInfo}}>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/me" element={<UserPage />} />
          </Routes>
        </AuthContext.Provider>
      </BrowserRouter>
    </MyPage>
  );
}

const MyPage = styled.div`
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow-x: hidden;
    overflow-y: scroll;
`;