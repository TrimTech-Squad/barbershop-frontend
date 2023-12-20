import React from "react";
// import logo from './logo.svg';
import "./App.css";
import { Login } from "./page/login/Login";
import { Route, Routes } from "react-router-dom";
import { Register } from "./page/register/Register";
import Auth from "./hooks/auth";

function App() {
  return (
    <Auth>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Auth>
  );
}

export default App;
