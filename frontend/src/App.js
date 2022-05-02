import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./components/pages/LandingPage";
import LoginPage from "./components/pages/LoginPage";
import RegisterPage from "./components/pages/RegisterPage";
import "./App.css";
import ExamplePage from "./components/pages/ExamplePage";
import Auth from "./components/hoc/Auth";
import LoginUserOnlyPage from "./components/pages/LoginUserOnlyPage";

export default function App() {
  const AuthLandingPage = Auth(LandingPage, null);
  const AuthLoginPage = Auth(LoginPage, false);
  const AuthRegisterPage = Auth(RegisterPage, false);
  const AuthExamplePage = Auth(ExamplePage, true);
  const AuthLoginUserOnlyPage = Auth(LoginUserOnlyPage, true);

  return (
    <>
      <BrowserRouter>
        <div>
          <Routes>
            <Route path="/" element={<AuthLandingPage />} />
            <Route path="/login" element={<AuthLoginPage />} />
            <Route path="/register" element={<AuthRegisterPage />} />
            <Route path="/exam" element={<AuthExamplePage />} />
            <Route path="/profile" element={<AuthLoginUserOnlyPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}
